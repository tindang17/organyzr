const uuidv4 = require('uuid/v4');

module.exports = (knex, user_id, team_uuid) => {
    knex('teams').select('id').where('uuid', team_uuid)
    .then(function(id){
      knex('teams_users').insert({user_id: user_id, team_id: id[0].id})
      .then(function(data){console.log(data)})
      .catch(function(err) {console.log(err)})
    })
    .catch(function(err) {console.log(err)})
}