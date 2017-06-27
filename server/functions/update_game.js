
module.exports = (knex, data, game_id, user_id, res) => {
    console.log('updating user', user_id)
    console.log(data)
    knex('games').where('id', game_id).update(data)
    .then(function(id){console.log('updated', data)
                     res
                     .json({ success: true, message: 'Success!' })
                    })
    .catch(function(err) {console.log(err)
                        res
                        .json({ success: false, message: err.constraint})
                     })
}


