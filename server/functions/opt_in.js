module.exports = (knex, games_users_uuid, res) => {
  console.log(games_users_uuid)
    knex('games_users').where('uuid', games_users_uuid).update({going: true})
    .then(function(games_users_data){console.log(games_users_data)
      res.send('You have successfully opted in to your game.');
                    })
    .catch(function(err) {console.log(err)
        res.send('error')
                     })
}






