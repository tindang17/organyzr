"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, res, userid) => {
    knex
      .select('name', 'uuid', 'logo')
      .from('teams').where('user_id', userid)
      .then(function(results){
        res.send(results);
        console.log('in teams.js', results);
      });
  return router;
};