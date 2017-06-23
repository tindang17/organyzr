module.exports = (knex, res, profile_id) => {



    knex('users').select('first_name', 'last_name', 'phone', 'text_notification', 'email_notification').where('id', profile_id)
    .then(function(user_data){console.log(user_data)
        res.send(user_data);
                    })
    .catch(function(err) {console.log(err)

                     })
}