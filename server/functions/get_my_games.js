    module.exports = (knex, res, profile_id, team_uuid) => {


    knex('teams').select('id').where('uuid', team_uuid).then(function(id){
      console.log('id', id[0].id, id, id)
    knex('games').select().where('team_id', id[0].id)
    .then(function(user_data){console.log(user_data)
        res.send(user_data);
                    })
    .catch(function(err) {console.log(err)

                     })})
}