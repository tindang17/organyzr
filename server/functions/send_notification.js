const moment = require('moment');

module.exports = (knex, game_id, user_id, transporter, res) => {


    emails = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
    .select("email").where('game_id', game_id).andWhere('going', true).andWhere('email_notification', true)

    phonenumbers = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
    .select("phone").where('game_id', game_id).andWhere('going', true).andWhere('text_notification', true)

    either = knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
    .select().where({game_id: game_id,
                     going: true,
                     text_notification: true}).orWhere({game_id: game_id,
                     going: true,
                     email_notification: true})


    gameinfo = knex('games').join('teams', 'teams.id', '=', 'games.team_id').select().where('games.id', game_id)

    Promise.all([emails, phonenumbers, gameinfo, either])
    .then( ([emailsData, phonenumbersData, gameinfoData, eitherData]) => {
      let niceData = {emails: emailsData, phoneNumbers: phonenumbersData, gameinfo: gameinfoData[0], number: eitherData}
      console.log(niceData)

      let result = "";
      emailsData.forEach(function(email){
        console.log(email)
        result += (email.email + ", ")})
      let email_list = result.slice(0, -2)
      console.log('emails: ', result.slice(0, -2))
      let gamedate = moment(niceData.gameinfo.date).format('LL')
      console.log(niceData.gameinfo)
      console.log('time', niceData.gameinfo.time)
      console.log('date', niceData.gameinfo.date)
      let message_subject = "Game Reminder: " + gamedate
      let message_body = "You have a game at " + niceData.gameinfo.location + " on " + gamedate + " at " + niceData.gameinfo.time + "."
      console.log('message subject: ', message_subject)
      console.log('message: ', message_body)

      let mailOptions = {
        from: 'organyzr@gmail.com',
        to: email_list,
        subject: message_subject,
        text: message_body
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });






      res.send(eitherData.length.toString())
    });

}