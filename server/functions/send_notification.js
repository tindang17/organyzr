require('dotenv').config();
// const sendNotification = require('../functions/send_notification');
// console.log('send notification', sendNotification)
const twilio = require ('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
// const playerNum = process.env.PLAYER_NUM;
const client = twilio(accountSid, authToken);
const express = require('express');
module.exports = (knex, game_id, user_id, res) => {


    const emails = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
    .select("email").where('game_id', game_id).andWhere('going', true).andWhere('email_notification', true)

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
        let niceData = {emails: emailsData, phoneNumbers: phonenumbersData, gameinfo: gameinfoData, number: eitherData} 
        console.log('phone number', niceData.phoneNumbers)
        console.log('game data', niceData.gameinfo)
        let playerNum;
        for(let game of niceData.gameinfo) {
          console.log('game info', game.location, game.time, game.date, game.description);
          for (let nums of niceData.phoneNumbers) {
            playerNum = nums.phone; 
              console.log('player number', playerNum)
            //twiliostuff: (niceData.phoneNumbers(array) + format niceData.gameinfo(object with game info) -> send)
            // loop niceData.phoneNumbers
            // client.messages.create({
            //   to: `+1${playerNum}`,
            //   from: twilioNum,
            //   body: `You have a game today at ${game.location} at ${game.time}`
            // }, (err, message) => {
            //   if(err) {
            //     console.log(err)
            //     res.status(500)
            //   } else {
            //     console.log(message.sid)
            //   }
            // })
          }
        }  

        //emailstuff: (niceData.emails(array) + format niceData.gameinfo(object with game info) -> send)

        //send when all done
        res.send('phone ' + niceData.phoneNumbers.length.toString())
      })

}