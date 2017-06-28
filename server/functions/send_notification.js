

module.exports = (knex, game_id, user_id, res) => {


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
      let niceData = {emails: emailsData, phoneNumbers: phonenumbersData, gameinfo: gameinfoData, number: eitherData}
      console.log(niceData)

      let result = "";
      emailsData.forEach(function(email){result += email})
      console.log(result)

      res.send(eitherData.length.toString())
    });

}