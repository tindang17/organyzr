module.exports = (knex, profile, done) => {
    console.log('add through fb')
    let user_data = {}

    user_data['email'] = profile.emails[0].value
    user_data['first_name'] = profile.name.givenName
    user_data['last_name'] = profile.name.familyName
    user_data['facebook_id'] = profile.id

    console.log(user_data)
    knex('users').insert(user_data).returning('id')
    .then(function(id){console.log('inserted', user_data)
        return done(null, id)
                    })
    .catch(function(err) {console.log(err)

                     })
}

