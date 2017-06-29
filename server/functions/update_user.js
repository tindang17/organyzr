module.exports = (knex, data, user_id, res) => {
    console.log('updating user', user_id)
    console.log(data)
    knex('users').where('id', user_id).update(data)
    .then(function(id){console.log('updated', data)
                     res
                     .json({ success: true, message: 'Success! Your settings have been saved.' })
                    })
    .catch(function(err) {console.log(err)
                        res
                        .json({ success: false, message: err.constraint})
                     })
}

