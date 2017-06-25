module.exports = (knex, res, profile_id) => {


    knex('teams_users')
.join('teams', 'teams_users.team_id', '=', 'teams.id')
.select().where('teams_users.user_id', profile_id).then(function(team_data){
console.log(team_data)
        res.send(team_data);
                    })
    .catch(function(err) {console.log(err)

                     })}




