const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');



module.exports = (knex, passport) => {

  //GET Login Page
  router.get('/', function(req, res) {
    let templateVars = req.session.passport;
    console.log(templateVars)
    console.log('get login')
    res.render('login', templateVars);
  });
  //Post Login ***
  router.post('/',
    passport.authenticate('local', { successRedirect: '/#/',
                                     failureRedirect: '/test/login'}),

    function(req, res) {
      console.log(req)
      console.log('post to login')
      res.json({ success: false, message: 'success'})
    }
  );
  return router;
};


