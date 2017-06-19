const express = require('express');
const body = require('body-parser');
const cookies = require('cookie-parser');
const WebpackDevServer = require('webpack-dev-server');


const webpack = {
  core: require('webpack'),
  middleware: require('webpack-dev-middleware'),
  hot: require('webpack-hot-middleware'),
  config: require('../client/webpack.config.js')
}

const app = express()
const compiler = webpack.core(webpack.config);

// const PORT = 8080;


app.use(body.json());
app.use(cookies());


app.use(webpack.middleware(compiler, {
  publicPath: webpack.config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

new WebpackDevServer(webpack.core(webpack.config), {
    publicPath: webpack.config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });


// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });