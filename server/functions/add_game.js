module.exports = (knex, user_id, game_data) => {
    console.log('adding game...')
    knex('teams').select('id').where('uuid', game_data.team_uuid).then(function(id){
console.log(id)
          knex('games').insert({date: game_data.date, time: game_data.time, description: game_data.description, location: game_data.location, team_id: id.id})
    .then(function(game){console.log('inserted game', game.id) })
    .catch(function(err) { console.log(err) })
    })

}