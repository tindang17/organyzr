const add_team = require("./add_team.js");

module.exports = (knex, data, res) => {
    console.log('adding locally...')
    console.log(data)
    if (data.password === data.confirmation) {
    let team = data['team_name']
    console.log(team)
    let user_data = data
    let result = true
    delete user_data['confirmation']
    delete user_data['team_name']
    knex('users').insert(user_data).returning('id')
    .then(function(id){console.log('inserted', user_data)
                     add_team(knex, parseInt(id), team)
                     res
                     .json({ success: true, message: 'Success!' })

                    })
    .catch(function(err) {console.log(err)
                        res
                        .json({ success: false, message: err.constraint})

                     })
  }
}

