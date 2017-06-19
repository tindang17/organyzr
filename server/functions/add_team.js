const uuidv4 = require('uuid/v4');

module.exports = (knex, user_id, team_name) => {
    console.log('adding team...')
    console.log(team_name)
    knex('teams').insert({name: team_name, uuid: uuidv4(), user_id: user_id})
    .then(function(){console.log('inserted team', user_id) })
    .catch(function(err) { console.log(err) })
}