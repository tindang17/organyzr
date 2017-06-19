module.exports = (knex, data, res) => {
    console.log('adding locally...')
    console.log(data)

    if (data.password === data.confirmation) {
    let user_data = data
    let result = true
    delete user_data['confirmation']
    delete user_data['team_name']
    knex('users').insert(user_data)
    .then(function(){console.log('inserted', user_data)
                     res.status(200);
                     res.send('success');

                   })
    .catch(function(err) {console.log(err)
                        res.status(400);
                        res.send('email taken');
                     })
  }

}

