
    module.exports = (knex, res, profile_id, team_uuid, game_id) => {
    
    // knex.select("*").from("teams").where('uuid', team_uuid)
    knex('games_users').join('users', 'games_users.user_id', '=', 'users.id')
    .select("*").where('game_id', game_id).andWhere('going', true).then(function(result) {
      res.send(result);
    })

    }
