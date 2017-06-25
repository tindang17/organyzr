
    module.exports = (knex, res, profile_id, team_uuid) => {
    
    // knex.select("*").from("teams").where('uuid', team_uuid)

    knex('teams_users').join('teams', 'teams_users.team_id', '=', 'teams.id')
    .join('users', 'teams_users.user_id', '=', 'users.id')
    .select("*").where('uuid', team_uuid).then(function(res) {
      console.log('hi');
    })

    }

    // knex('teams').select('id').where('uuid', team_uuid).then(function(id){
    //   console.log('id', id[0].id, id, id)
    // knex('games').select().where('team_id', id[0].id)
    // .then(function(user_data){
    //   knex('games_users').select('user_id').where('going', true)
    //   .then(function(user_id) {
    //     knex.select('*').from('users').rightJoin('')
    //     console.log('user_id', user_id);
    //     let theNames = [];

    //     // user_id.forEach((item) => {
    //     //     knex('users').select('first_name').where('id', item.user_id)
    //     //     .then(function (res) { 
    //     //       console.log('inside here',res);
    //     //       theNames.push(res);
    //     //       console.log('theNames inside here', theNames);
    //     //       return theNames;
    //     //     })
    //     // })
    //     // return theNames;
    //   })
    //     .then(function(theNames) {
    //       console.log('wasup', theNames);
    //     })
    //   })
    //                 })
    // .catch(function(err) {console.log(err)

    //                  })}
