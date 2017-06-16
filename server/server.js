const express = require('express');
const body = require('body-parser');
const cookies = require('cookie-parser');

const webpack = {
  core: require('webpack'),
  middleware: require('webpack-dev-middleware'),
  hot: require('webpack-hot-middleware'),
  config: require('../client/webpack.config.js')
}

const app = express()
const compiler = webpack.core(webpack.config);

const PORT = 8080;


app.use(body.json());
app.use(cookies());


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