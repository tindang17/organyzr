const express = require('express');
const ENV = process.env.ENV || "development";
const body = require('body-parser');
const cookies = require('cookie-parser');

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

const webpack = {
  core: require('webpack'),
  middleware: require('webpack-dev-middleware'),
  hot: require('webpack-hot-middleware'),
  config: require('../client/webpack.config.js')
}

const app = express()
const compiler = webpack.core(webpack.config);

const PORT = 8080;

//Functions

const add_user_local = require("./functions/add_user_local.js");
const add_user_facebook = require("./functions/add_user_facebook.js");

app.use(body.json());
app.use(cookies());

// Listen to POST requests to /users.
app.post('/signup', function(req, res) {
  // Get sent data.
  console.log('req', req)
  let user = req.body;
  // Do a MySQL query.
  console.log(user)
  add_user_local(knex, user, res)
});


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
