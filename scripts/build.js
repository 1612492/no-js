const Webpack = require('webpack');

const genConfig = require('./gen-config');

const compiler = Webpack(genConfig(true));

compiler.run((error, stats) => {
  if (error) throw error;

  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    })
  );
});
