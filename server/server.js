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


//Routes
const gamesRoutes = require('./routes/games')

const teamsRoutes = require('./routes/teams')
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

// const add_user_local = require("./functions/passport/add_user_local.js");
const add_user_facebook = require("./functions/add_user_facebook.js");
const add_team = require("./functions/add_team.js");


const settings_data = require("./functions/settings_data.js");
const update_user = require("./functions/update_user.js");

app.use(knexLogger(knex));

app.use(cookieSession({
  name: 'session',
  keys: ['kfpoier0tu5g0rejgre', 'erljfo34if0jwfdkepf']
}));


const passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy
 , FacebookStrategy = require('passport-facebook').Strategy;
// FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(
  function(email, password, done) {
    console.log('local passport', email, password)
      knex
          .select()
          .where({email: email})
          .from("users").first().then(user => {
      if (!user) {
        console.log('user not found')
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!(user.password === password)) {
        console.log('incoorrect password')
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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
        console.log('user not found')
        return done(null, false, { message: 'Incorrect email.' });
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/',
                                      failureRedirect: '/#/login' }));


// app.use('/games', gamesRoutes(knex));


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/test/login');
});



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
  // Get sent data.
  console.log('req', req)
  let user = req.body;
  // Do a MySQL query.
  console.log(user)
  add_user_local(knex, user, res)
});

// Listen to POST requests to /users.
app.post('/new_team', function(req, res) {
  // Get sent data.
  console.log('req', req.body)
  console.log('new_team')
  let user_id = req.session.passport.user
  // Do a MySQL query.

  add_team(knex, user_id, req.body.name, req.body.logo)
});



app.get('/test/login', function(req, res) {
    let templateVars = req.session.passport;
    console.log('templatevars', templateVars)
    res.render('login', templateVars);
  });


app.post('/login',
  passport.authenticate('local',  { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false }),
    function(req, res) {
      console.log(req)
      console.log('post to login')
      res.json({ success: false, message: 'success'})
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

app.post('/login',
  passport.authenticate('local',  { successRedirect: '/',
                                   failureRedirect: '/test/login',
                                   failureFlash: false }),
    function(req, res) {
      console.log(req)
      console.log('post to login')
      res.json({ success: false, message: 'success'})
    }
);


app.use('/test/login', loginRoutes(knex, passport));
app.get('/games/data', function(req, res) {
    console.log('server side');
    console.log(req.session.passport.id)
    gamesRoutes(knex, res, req.session.passport.id);
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



app.get('/landing/check', function(req, res) {
  // console.log(req.session.passport.user);
  if (!req.user) {
    res.send('not logged in');
  } else {
    // console.log('no user');
    res.send(req.session.passport.user.toString())
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

