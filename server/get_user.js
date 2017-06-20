const express = require('express');

module.exports = (knex, res) => {
  knex
  .select()
  .from('users')
  .then((results) => {
    console.log('in get user', results)
    res.send(JSON.stringify(results));
  });
};