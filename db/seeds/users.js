exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex
  .raw('TRUNCATE TABLE users CASCADE')
  .then(() => knex('users').del())
  .then (() => {
    return Promise.all([
    // insert data into users table
      knex('users').insert({
        id: 1,
        first_name: 'Grant',
        last_name: 'Tran',
        email: 'grant@tran',
        password: '123456',
        phone: 123456789,
        text_notification: false,
        email_notification: false
      }),
      knex('users').insert({
        id: 2,
        first_name: 'Gran',
        last_name: 'Tran',
        email: 'gran@tran',
        password: '123456',
        phone: 123456780,
        text_notification: true,
        email_notification: false
      }),
      knex('users').insert({
        id: 3,
        first_name: 'Gra',
        last_name: 'Tran',
        email: 'gra@tran',
        password: '123456',
        phone: 123456790,
        text_notification: true,
        email_notification: false
      }),
      knex('users').insert({
        id: 4,
        first_name: 'Gren',
        last_name: 'Tran',
        email: 'gren@tran',
        password: '123456',
        phone: 183456790,
        text_notification: true,
        email_notification: false
      }),
      knex('users').insert({
        id: 5,
        first_name: 'Spencer',
        last_name: 'Ang',
        email: 'Spencer@Ang',
        phone: 183456590,
        facebook_id: 'sdfsdf435654fdgeg6575fdgdf',
        text_notification: false,
        email_notification: true
      })
    ])
  })
  .then(() => {
    return Promise.all([
      knex('teams').insert({
        id: 1,
        name: 'VAG',
        logo: 'https://s-media-cache-ak0.pinimg.com/736x/50/d4/bf/50d4bf294b796c1f38aff4c61e69b2a7.jpg',
        uuid: 'sdfsdfw33t254wfdsf25t4wfew43t3',
        user_id: 1
      })
    ]);
  })
// insert data into games table
  .then(() => {
    return Promise.all([
      knex('games').insert({
        id: 1,
        location: 'lighthouse labs',
        date: '2017-06-15',
        time: '04:05:06 PST',
        description: 'get lit',
        team_id: 1
      })
    ]);
  })
  .then(() => {
    return Promise.all([
      knex('games_users').insert({
        id: 1,
        game_id: 1,
        user_id: 1,
        going: true
      }),
      knex('games_users').insert({
        id: 2,
        game_id: 1,
        user_id: 2,
        going: true
      }),
      knex('games_users').insert({
        id: 3,
        game_id: 1,
        user_id: 3,
        going: true
      }),
      knex('games_users').insert({
        id: 4,
        game_id: 1,
        user_id: 4,
        going: true
      }),
      knex('games_users').insert({
        id: 5,
        game_id: 1,
        user_id: 5,
        going: true
      })
    ]);
  })
  .then(() => {
    return Promise.all([
      knex('teams_users').insert({
        id: 1,
        team_id: 1,
        user_id: 1
      }),
      knex('teams_users').insert({
        id: 2,
        team_id: 1,
        user_id: 2
      }),
      knex('teams_users').insert({
        id: 3,
        team_id: 1,
        user_id: 3
      }),
      knex('teams_users').insert({
        id: 4,
        team_id: 1,
        user_id: 4
      }),
      knex('teams_users').insert({
        id: 5,
        team_id: 1,
        user_id: 5
      })
    ]);
  })
};

