const uuidv4 = require('uuid/v4');

module.exports = (knex, user_id, team_uuid) => {
    knex('teams').select('id').where('uuid', team_uuid)
    .then(function(id){
      knex('teams_users').insert({user_id: user_id, team_id: id[0].id}).returning('*')
      .then(function(data){
        console.log('error data', data, data[0].team_id)
        knex('games').select('id').where('team_id', data[0].team_id)
        .then(function(games) {
          console.log('games array check', games)
          games.forEach(function(game) {
            let id = game.id
            console.log('for each add team game', game)
            knex('games_users').insert({user_id: user_id, game_id: id})
            .then(function(){
            })})
        })
        .catch(function(err) {console.log(err)})
      console.log('data', data)})
      .catch(function(err) {console.log(err)})
    })
    .catch(function(err) {console.log(err)})
}