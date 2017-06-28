"use strict";

require('dotenv').config();
// set up server
const ENV = process.env.ENV || "development";
const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

const bcrypt = require('bcrypt');
const {compareSync} = require("bcrypt");

//Routes
const gamesRoutes = require('./routes/games');
const teamsRoutes = require('./routes/teams');
const loginRoutes = require('./routes/test/login');
// const twilioRoutes = require('./routes/twilio');

const webpack = {
  core: require('webpack'),
  middleware: require('webpack-dev-middleware'),
  hot: require('webpack-hot-middleware'),
  config: require('../client/webpack.config.js')
};

const app = express();
const compiler = webpack.core(webpack.config);

app.set('view engine', 'ejs');

if (ENV === 'development') {
  const knexLogger = require('knex-logger');
  app.use(knexLogger(knex));
}

//Functions

const add_user_local = require("./functions/add_user_local.js");

// const add_user_local = require("./functions/passport/add_user_local.js");
const add_user_facebook = require("./functions/add_user_facebook.js");
const add_team = require("./functions/add_team.js");
const add_game = require("./functions/add_game.js");
const update_availablility = require("./functions/update_availablility.js");

const add_my_team = require("./functions/add_my_team.js");
const settings_data = require("./functions/settings_data.js");
const update_user = require("./functions/update_user.js");
const delete_game = require("./functions/delete_game.js");

const getMyGames = require("./functions/get_my_games.js")

const get_my_teams =  require("./functions/get_my_teams.js");
const getTeamGames = require("./functions/get_team_games.js");
const getRosterData = require("./functions/get_roster.js");
const update_game = require("./functions/update_game.js");
const send_notification = require("./functions/send_notification.js");

const passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy
 , FacebookStrategy = require('passport-facebook').Strategy;

app.use(knexLogger(knex));

app.use(cookieSession({
  name: 'session',
  keys: ['kfpoier0tu5g0rejgre', 'erljfo34if0jwfdkepf']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log('local passport', email, password)
      knex
        .select()
        .where({email: email})
        .from("users").first().then(user => {
          console.log('bcrypt, bcrypt', bcrypt.compareSync(password, user.password))
          if (!user) {
            console.log('user not found')
            return done(null, false, { message: 'Incorrect email.' });
          }
          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          }
          if (!(user.password === password)) {
            console.log('incoorrect password')
            return done(null, false, { message: 'Incorrect password.' });
          }
          }).catch(function(err) {
            return done(err);
          });
  }
));

//CHANGE CALLBACK URL TO WHAT WE USE
passport.use(new FacebookStrategy({
  clientID: '891703524347118',
  clientSecret: '98717a1f70a79ad745206c6a7e6323f9',
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'email', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    knex
    .select()
    .where({email: profile.emails[0].value})
    .from("users").first().then(user => {
      if (!user) {
        console.log('user not found, creating new user')
        add_user_facebook(knex, profile, done)
      }
      return done(null, user);
      }).catch(function(err) {
      return done(err);
    });
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log("serialize", user.id)
});

passport.deserializeUser((id, done) => {
  console.log("deserialize", id)
  knex('users').where({id: id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});


app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/',
                                      failureRedirect: '/#/login' }));


// app.use('/games', gamesRoutes(knex));


app.post('/logout', function(req, res){
  // req.logout();
  req.session = null;
  res.redirect('/');
  // res.redirect('/#/login');
});

// app.use('/manage', twilioRoutes());

app.post('/updategame/:game_id', function(req, res) {
  console.log(req.body)
  console.log(req.params.game_id)
  console.log(req.session.passport.user)
  update_game(knex, req.body, req.params.game_id, req.session.passport.user, res)
})

app.use(webpack.middleware(compiler, {
  publicPath: webpack.config.output.publicPath,
  noInfo: true,
  hot: true,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
}));

app.use(webpack.hot(compiler));


// Listen to POST requests to /users.
app.post('/signup', function(req, res) {
  let user = req.body;
  // Do a MySQL query.
  add_user_local(knex, user, res)
});


// Listen to POST requests to /users.
app.post('/new_team', function(req, res) {
  // Get sent data.
  console.log('req', req.body)
  console.log('new_team')
  let user_id = req.session.passport.user
  // Do a MySQL query
  add_team(knex, user_id, req.body.name, req.body.logo)
  res.sendStatus(200);
});

app.post('/add_team', function(req, res) {
  // Get sent data.
  let user_id = req.session.passport.user
  console.log('req', req.body)
  console.log('adding a team for', user_id)

  // Do a MySQL query.

  add_my_team(knex, user_id, req.body.uuid, res);
  res.sendStatus(200);
});


// Listen to POST requests to /users.
app.post('/new_game', function(req, res) {
  // Get sent data.
  console.log('req', req.body)
  console.log('new_team')
  let user_id = req.session.passport.user
  // Do a MySQL query.

  add_game(knex, user_id, req.body)
  res.sendStatus(200);
});


app.post('/login',
  passport.authenticate('local'), function(err, user, info) {
    console.log('login post')
    if (err) { return (err); }
    if (!user) { return res.send({ success: false, message: info.message}); }
    else { return res.json({ success: true, message: 'success'}); }
  });



// app.post('/test/login',
//   passport.authenticate('local'),
//     function(req, res) {
//       console.log('this is res', res)
//       res.json({message: 'success'})
//     }
// );

app.post('/schedule/:game_id',
    function(req, res) {
      update_availablility(knex, req.params.game_id, req.session.passport.user, res)
    }
);

app.post('/deletegame/:game_id',
    function(req, res) {
      delete_game(knex, req.params.game_id, req.session.passport.user, res)
    }
);

app.post('/notification/:game_id',
    function(req, res) {
      send_notification(knex, req.params.game_id, req.session.passport.user, res)
    }
);



// Listen to POST requests to /users.
app.post('/settings', function(req, res) {
  // Get sent data.

  const data = req.body;
  let user_id = req.session.passport.user;
  console.log('user_id', user_id)
  console.log('data', data)
  // Do a MySQL query.

  // add_user_local(knex, user, res)
  update_user(knex, data, user_id, res)
});


// redirection routes

app.get('/about', function(req, res) {
  res.redirect('/#/about');
})

app.get('/faq', function(req, res) {
  res.redirect('/#/faq');
})

app.get('/games', function(req, res) {
  if (!req.user) {
    res.redirect('/#/login');
  } else {
    res.redirect('/#/games');
  }
})

app.get('/myteams', function(req, res) {
  if (!req.user) {
    res.redirect('/#/login');
  } else {
    res.redirect('/#/myteams');
  }
})

app.use('/test/login', loginRoutes(knex, passport));


app.get('/mygames/data/:team_uuid', function(req, res) {
    console.log('server side');
    console.log(req.params.team_uuid)
    console.log(req.session.passport.user)
    getMyGames(knex, res, req.session.passport.user, req.params.team_uuid);
})

app.get('/games/data/:team_uuid', function(req, res) {
    console.log('server side');
    console.log(req.params.team_uuid)
    console.log(req.session.passport.user)
    getTeamGames(knex, res, req.session.passport.user, req.params.team_uuid);
})

app.get('/myteams/data', function(req, res) {
    console.log('server side');
    console.log(req.session.passport)
    console.log(req.session.passport.user)
    get_my_teams(knex, res, req.session.passport.user);
})

app.get('/teams/data', function(req, res) {
    console.log('server side');
    console.log(req.session.passport)
    console.log(req.session.passport.user)
    teamsRoutes(knex, res, req.session.passport.user);
})

app.get('/settings/data', function(req, res) {
    console.log('server side settings');
    console.log(req.session.passport)
    console.log(req.session.passport.user)
    settings_data(knex, res, req.session.passport.user);
})

app.get('/player/data/:team_uuid/:game_id', function(req, res) {
  console.log('passport',req);
  console.log('params',req.params);
  // res.send(req.session.passport.user.toString());
  getRosterData(knex, res, req.session.passport.user, req.params.team_uuid, req.params.game_id);
})


app.get('/landing/check', function(req, res) {
  // console.log(req.session.passport.user);
  if (!req.session.passport) {
    res.send('not logged in');
  } else {
    knex.select("*").from("users").where({
      id: req.session.passport.user
    }).then(function(results){
      console.log(results);
      res.send(results);
  }
)}
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

