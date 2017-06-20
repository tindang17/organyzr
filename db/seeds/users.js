exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex
  .raw('TRUNCATE TABLE users CASCADE')
  .then(() => knex('users').del())
  .then (() => {
    return Promise.all([
    // insert data into users table
      knex('users').insert({
        first_name: 'Grant',
        last_name: 'Tran',
        email: 'grant@tran',
        password: '123456',
        phone: 123456789,
        text_notification: false,
        email_notification: false
      }),
      knex('users').insert({
        first_name: 'Gran',
        last_name: 'Tran',
        email: 'gran@tran',
        password: '123456',
        phone: 123456780,
        text_notification: true,
        email_notification: false
      }),
      knex('users').insert({
        first_name: 'Gra',
        last_name: 'Tran',
        email: 'gra@tran',
        password: '123456',
        phone: 123456790,
        text_notification: true,
        email_notification: false
      }),
      knex('users').insert({
        first_name: 'Gren',
        last_name: 'Tran',
        email: 'gren@tran',
        password: '123456',
        phone: 183456790,
        text_notification: true,
        email_notification: false
      }),
      knex('users').insert({
        first_name: 'Spencer',
        last_name: 'Ang',
        email: 'Spencer@Ang',
        phone: 183456590,
        facebook_id: 'sdfsdf435654fdgeg6575fdgdf',
        text_notification: false,
        email_notification: true
      }),
      knex('users').insert({
        first_name: 'Tin',
        last_name: 'Dang',
        email: 'Tin@Dang',
        phone: 183451234,
        facebook_id: 'sdfsdf435654adgeg6575fdgdf',
        text_notification: true,
        email_notification: true
      })
    ]);
  })
  .then(() => {
    return Promise.all([
      knex('teams').insert({
        name: 'VAG',
        logo: 'https://s-media-cache-ak0.pinimg.com/736x/50/d4/bf/50d4bf294b796c1f38aff4c61e69b2a7.jpg',
        uuid: 'sdfsdfw33t254wfdsf25t4wfew43t3',
        user_id: 1
      }),
      knex('teams').insert({
        name: 'LHL',
        logo: 'logo.jpg',
        uuid: 'vdweferge25ddsfdsf25t4wfew43t3',
        user_id: 6
      })
    ]);
  })
// insert data into games table
  .then(() => {
    return Promise.all([
      knex('games').insert(
        {
        location: 'lighthouse labs',
        date: '2017-06-15',
        time: '04:05:06 PST',
        description: 'get lit',
        team_id: 1
      }),
      knex('games').insert({
        location: 'Yaletown',
        date: '2017-06-30',
        time: '14:05:06 PST',
        description: 'have fun',
        team_id: 1
      }),
      knex('games').insert({
        location: 'Gastown',
        date: '2017-07-20',
        time: '14:05:06 PST',
        description: 'bring beer',
        team_id: 2
      })
    ]);
  })
  .then(() => {
    return Promise.all([
      knex('games_users').insert({
        game_id: 1,
        user_id: 1,
        going: true
      }),
      knex('games_users').insert({
        game_id: 1,
        user_id: 2,
        going: true
      }),
      knex('games_users').insert({
        game_id: 1,
        user_id: 3,
        going: true
      }),
      knex('games_users').insert({
        game_id: 1,
        user_id: 4,
        going: true
      }),
      knex('games_users').insert({
        game_id: 1,
        user_id: 5,
        going: true
      }),
      knex('games_users').insert({
        game_id: 2,
        user_id: 1,
        going: true
      }),
      knex('games_users').insert({
        game_id: 2,
        user_id: 2,
        going: true
      }),
      knex('games_users').insert({
        game_id: 2,
        user_id: 3,
        going: true
      }),
      knex('games_users').insert({
        game_id: 3,
        user_id: 6,
        going: true
      })
    ]);
  })
  .then(() => {
    return Promise.all([
      knex('teams_users').insert({
        team_id: 1,
        user_id: 1
      }),
      knex('teams_users').insert({
        team_id: 1,
        user_id: 2
      }),
      knex('teams_users').insert({
        team_id: 1,
        user_id: 3
      }),
      knex('teams_users').insert({
        team_id: 1,
        user_id: 4
      }),
      knex('teams_users').insert({
        team_id: 1,
        user_id: 5
      }),
      knex('teams_users').insert({
        team_id: 2,
        user_id: 6
      })
    ]);
  })
};

