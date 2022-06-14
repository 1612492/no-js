const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const genConfig = require('./gen-config');

const compiler = Webpack(genConfig(false));

const server = new WebpackDevServer(
  {
    port: 3000,
    static: process.cwd() + '/dist',
    open: true,
  },
  compiler
);

server.start();
