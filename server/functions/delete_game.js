


module.exports = (knex, game_id, user_id, res) => {
    console.log('deleting game ', game_id)
    knex('games_users').where('game_id', game_id).del()
    .then(function(rows){console.log(rows)
      knex('games').where('id', game_id).del()
      .then(function(games){console.log('deleted game ', games)
        res.send(game_id)
    })
      .catch(function(err) { console.log(err) })
    })
    .catch(function(err) { console.log(err) })
}