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
// const nodemailer = require('nodemailer');

//Routes
const gamesRoutes = require('./routes/games');
const teamsRoutes = require('./routes/teams');
const loginRoutes = require('./routes/test/login');

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

const opt_in = require("./functions/opt_in.js");
const opt_out = require("./functions/opt_out.js");


// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USERNAME,
//     pass: process.env.GMAIL_PASSWORD
//   }
// });

// var mailOptions = {
//   from: 'organyzr@gmail.com',
//   to: 'grant.tran@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


const passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy
 , FacebookStrategy = require('passport-facebook').Strategy;

// const scheduler = require('./functions/scheduler');
app.use(knexLogger(knex));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
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
      } else {
      return done(null, user);
    }
      }).catch(function(err) {
      return done(err);
    });
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex('users').where({id: id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err, null); });
});


app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/',
                                      failureRedirect: '/#/login' }));


app.post('/logout', function(req, res){
  req.session = null;
  res.redirect('/');
});


app.post('/updategame/:game_id', function(req, res) {
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
  let user_id = req.session.passport.user
  // Do a MySQL query
  add_team(knex, user_id, req.body.name, req.body.logo)
  res.sendStatus(200);
});

app.post('/add_team', function(req, res) {
  // Get sent data.
  let user_id = req.session.passport.user
  // Do a MySQL query.

  add_my_team(knex, user_id, req.body.uuid, res);
  res.sendStatus(200);
});


// Listen to POST requests to /users.
app.post('/new_game', function(req, res) {
  // Get sent data.
  let user_id = req.session.passport.user
  // Do a MySQL query.
  add_game(knex, user_id, req.body)
  res.sendStatus(200);
});


app.post('/login',
  passport.authenticate('local'), function(err, user, info) {
    if (err) { return (err); }
    if (!user) { return res.send({ success: false, message: info.message}); }
    else { return res.json({ success: true, message: 'success'}); }
  });

app.post('/optin/:games_users_uuid',
  function(req, res) {
    opt_in(knex, req.params.games_users_uuid, res)
  });

app.post('/optout/:games_users_uuid',
  function(req, res) {
     opt_out(knex, req.params.games_users_uuid, res)
  });


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


// scheduler.start(knex);

// app.post('/notification/:game_id',
//     function(req, res) {
//       send_notification(knex, req.params.game_id, req.session.passport.user, transporter, res)
//     }
// );



// Listen to POST requests to /users.
app.post('/settings', function(req, res) {
  const data = req.body;
  let user_id = req.session.passport.user;
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
    getMyGames(knex, res, req.session.passport.user, req.params.team_uuid);
})

app.get('/games/data/:team_uuid', function(req, res) {
    getTeamGames(knex, res, req.session.passport.user, req.params.team_uuid);
})

app.get('/myteams/data', function(req, res) {
    get_my_teams(knex, res, req.session.passport.user);
})

app.get('/teams/data', function(req, res) {
    teamsRoutes(knex, res, req.session.passport.user);
})

app.get('/settings/data', function(req, res) {
    settings_data(knex, res, req.session.passport.user);
})

app.get('/player/data/:team_uuid/:game_id', function(req, res) {
  getRosterData(knex, res, req.session.passport.user, req.params.team_uuid, req.params.game_id);
})


app.get('/landing/check', function(req, res) {
  if (!req.session.passport) {
    res.send('not logged in');
  } else {
    knex.select("*").from("users").where({
      id: req.session.passport.user
    }).then(function(results){
      res.send(results);
  }
)}
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

