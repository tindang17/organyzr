"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, res, userid) => {
  let user_team = knex.select('team_id').from('teams_users')
  .where('user_id', userid)
  console.log('this users team id', user_team);
    knex
      .select("*")
      .from("games")
      .where('team_id', user_team)
      .then(function(results){
        res.send(results);
        console.log('in games.js', results);
      });
  return router;
};