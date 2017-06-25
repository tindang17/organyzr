    module.exports = (knex, res, profile_id, team_uuid) => {


    knex('teams').select('id').where('uuid', team_uuid).then(function(id){
      console.log('id', id[0].id, id, id)
      console.log('profile', profile_id)
    knex('games').join('games_users', 'games_users.game_id', '=', 'games.id').select().where('team_id', id[0].id).andWhere('user_id', profile_id)
    .then(function(user_data){console.log(user_data)
        res.send(user_data);
                    })
    .catch(function(err) {console.log(err)

                     })})
}