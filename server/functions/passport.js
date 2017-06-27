const bcrypt = require('bcrypt');
const {compareSync} = require("bcrypt");

module.exports = (passport, knex, LocalStrategy, FacebookStrategy) => {
  
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
}