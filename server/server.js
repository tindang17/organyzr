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

// set up knex
// set up webpack
// const WebpackDevServer = require('webpack-dev-server');


const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

const gamesRoutes = require('./routes/games')

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
// const add_user_facebook = require("./functions/add_user_facebook.js");




app.use(knexLogger(knex));

app.use(cookieSession({
  name: 'session',
  keys: ['kfpoier0tu5g0rejgre', 'erljfo34if0jwfdkepf']
}));


const passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy;
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

// passport.use(new FacebookStrategy({
//     clientID: '891703524347118',
//     clientSecret: '98717a1f70a79ad745206c6a7e6323f9',
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'email', 'name']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // User.findOrCreate(..., function(err, user) {
//     //   if (err) { return done(err); }
//     //   done(null, user);
//     // });
//     console.log('sdfsfd')
//     console.log(accessToken)
//     console.log(refreshToken)
//     console.log(profile)
//     console.log(done)
//     knex('users')
//     done(null, )
//   }
// ));


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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


// // Redirect the user to Facebook for authentication.  When complete,
// // Facebook will redirect the user back to the application at
// //     /auth/facebook/callback
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

// // Facebook will redirect the user to this URL after approval.  Finish the
// // authentication process by attempting to obtain an access token.  If
// // access was granted, the user will be logged in.  Otherwise,
// // authentication has failed.
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' }));


// app.use('/games', gamesRoutes(knex));


// Listen to POST requests to /users.
app.post('/signup', function(req, res) {
  // Get sent data.
  console.log('req', req)
  let user = req.body;
  // Do a MySQL query.
  console.log(user)
  add_user_local(knex, user, res)
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

app.get('/test/login', function(req, res) {
    let templateVars = req.session.passport;
    console.log('templatevars', templateVars)
    res.render('login', templateVars);
  });
app.post('/test/login',
  passport.authenticate('local',  { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false }),
    function(req, res) {
      console.log(req)
      console.log('post to login')
      res.json({ success: false, message: 'success'})
    }
);

app.get('/games/data', function(req, res) {
    console.log('server side');
    gamesRoutes(knex, res);
})



app.use(webpack.middleware(compiler, {
  publicPath: webpack.config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));





app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

