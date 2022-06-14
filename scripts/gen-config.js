const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = `${process.cwd()}/src`;
const buildPath = `${process.cwd()}/dist`;

module.exports = function (isProd) {
  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      main: `${srcPath}/index.jsx`,
    },
    output: {
      path: buildPath,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js?x$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    ...(isProd
      ? {
          optimization: {
            splitChunks: {
              cacheGroups: {
                vendor: {
                  test: /node_modules/,
                  name: 'lib',
                  chunks: 'all',
                },
              },
            },
          },
        }
      : {}),
    stats: 'minimal',
    plugins: [
      new HtmlWebpackPlugin({ template: `${srcPath}/index.html`, minify: true }),
      ...(isProd ? [new MiniCssExtractPlugin()] : []),
    ],
  };
};
