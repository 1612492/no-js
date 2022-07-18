const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = `${process.cwd()}/src`;
const buildPath = `${process.cwd()}/dist`;

module.exports = function (isProd = false) {
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
          resourceQuery: { not: [/raw/] },
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          resourceQuery: { not: [/raw/] },
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          resourceQuery: /raw/,
          type: 'asset/source',
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
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: `${srcPath}/index.html`,
        inject: false,
        ...(isProd ? { minify: true } : {}),
      }),
      ...(isProd ? [new MiniCssExtractPlugin()] : []),
    ],
  };
};
