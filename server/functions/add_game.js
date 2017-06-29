const moment = require('moment');
const uuidv4 = require('uuid/v4');

module.exports = (knex, user_id, game_data) => {



    console.log('adding game...')
    knex('teams').select('id').where('uuid', game_data.team_uuid)
    .then(function(id){
      console.log(id)
      knex('games').insert({date: game_data.date, time: game_data.time, description: game_data.description, location: game_data.location, team_id: id[0].id}).returning('*')
      .then(function(game){
        console.log('inserted game', game.id, game, game[0].team_id)
        knex('teams_users').select('user_id').where('team_id', game[0].team_id).returning('*')
        .then(function(teams_users) {
          teams_users.forEach(function(team_user) {
            let user_id_integer = team_user.user_id
            console.log('adding a game for user', user_id_integer)
            knex('games_users').insert({user_id: user_id_integer, game_id: game[0].id, uuid: uuidv4()})
            .then(function(a){console.log('added finally', a)})
            .catch(function(err) {console.log(err)})
          })
        })
        .catch(function(err) {console.log(err)})
      })
      .catch(function(err) { console.log(err) })
    })
}