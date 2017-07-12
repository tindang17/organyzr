require('dotenv').config();
const CronJob = require('cron').CronJob;
const moment = require('moment');
const twilio = require ('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
const client = twilio(accountSid, authToken);
const express = require('express');

const scheduler = require('./scheduler')
module.exports = (knex, game_id, user_id, transporter, res) => {


  const emails = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
  .select("email", 'uuid').where('game_id', game_id).andWhere('going', true).andWhere('email_notification', true)

  const phonenumbers = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
  .select("phone").where('game_id', game_id).andWhere('going', true).andWhere('text_notification', true)

  const either = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
  .select().where({game_id: game_id,
                    going: true,
                    text_notification: true}).orWhere({game_id: game_id,
                    going: true,
                    email_notification: true})

  const gameinfo = knex('games').join('teams', 'teams.id', '=', 'games.team_id').select().where('games.id', game_id)

  Promise.all([emails, phonenumbers, gameinfo, either])
  .then( ([emailsData, phonenumbersData, gameinfoData, eitherData]) => {
    let niceData = {emails: emailsData, phoneNumbers: phonenumbersData, gameinfo: gameinfoData[0], number: eitherData}
    console.log(niceData)

    let gamedate = moment(niceData.gameinfo.date).format('LL')
    let message_subject = "Game Reminder: " + gamedate
    let message_body = "You have a game at " + niceData.gameinfo.location + " on " + gamedate + " at " + niceData.gameinfo.time + "."
    console.log('message subject: ', message_subject)
    console.log('message: ', message_body)


    emailsData.forEach(function(email){
      console.log(email)

      let message_html = `<b>${message_body}</b> <br></br><br></br><a href=\'http://localhost:8080/#/optin/${email.uuid}\' >Click Here to Opt In!</a><br></br><br></br><a href=\'http://localhost:8080/#/optout/${email.uuid}\' >Click Here to Opt Out!</a>`
      console.log(message_html)

      let mailOptions = {
        from: 'organyzr@gmail.com',
        to: email.email,
        subject: message_subject,
        html: message_html
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    })

    let game = niceData.gameinfo
    let playerNum;

        console.log('game info', game.location, game.time, game.date, game.description);
    for (let nums of niceData.phoneNumbers) {
      playerNum = nums.phone;
        console.log('player number', playerNum)
      //twiliostuff: (niceData.phoneNumbers(array) + format niceData.gameinfo(object with game info) -> send)
      // loop niceData.phoneNumbers
      client.messages.create({
        to: `+1${playerNum}`,
        from: twilioNum,
        body: `You have a game today at ${game.location} at ${game.time} on ${game.date}`
      }, (err, message) => {
        if(err) {
          console.log(err)
          res.status(500)
        } else {
          console.log(message.sid)
        }
      })
    }

    res.send('phone ' + niceData.phoneNumbers.length.toString() + 'and email ' + emailsData.length.toString())

  })
}