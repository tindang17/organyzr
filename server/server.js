"use strict";

require('dotenv').config();
// set up server
const ENV = process.env.ENV || "development";
const PORT = process.env.PORT || 8080;
const express = require('express');
const body = require('body-parser');
const cookies = require('cookie-parser');
// set up knex
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
// set up webpack
const webpack = {
  core: require('webpack'),
  middleware: require('webpack-dev-middleware'),
  hot: require('webpack-hot-middleware'),
  config: require('../client/webpack.config.js')
};

const app = express();
const compiler = webpack.core(webpack.config);


if (ENV === 'development') {
  const knexLogger = require('knex-logger');
  app.use(knexLogger(knex));
}

app.use(body.json());
app.use(cookies());

const getUser = require ('./get_user')

app.get(`/about/data`, (req, res) => {
  console.log('hello from server');
  getUser(knex, res);
  // res.send('hello from server')
});

app.use(webpack.middleware(compiler, {
  publicPath: webpack.config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

// routes to handle react request


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});