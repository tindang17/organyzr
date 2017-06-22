"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, res, userid) => {
    knex
      .select("*")
      .from("games")
      .then(function(results){
        res.send(results);
        console.log('in games.js', results);
      });
  return router;
};