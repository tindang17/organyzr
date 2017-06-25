module.exports = (knex, game_id, user_id, res) => {
    console.log('updating user', user_id)
    console.log('game_id', game_id)

    knex('games_users').select().where('user_id', user_id).andWhere('game_id', game_id)
    .then(function(data){
        console.log('data', data)
        console.log(!data[0].going)
        console.log(data[0].going)
        let opposite_data_going = !data[0].going
        knex('games_users').where('user_id', user_id).andWhere('game_id', game_id).update('going', opposite_data_going)
    .then(function(id){console.log('updated', data)
                     res
                     .json({ success: true, message: 'Success!' })
                    })
    .catch(function(err) {console.log(err)
                        res
                        .json({ success: false, message: err.constraint})
                     })})
}