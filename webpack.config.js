const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({hot: true, template: './src/index.html', filename: 'index.html', inject: 'body'});
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /(\.css|\.scss|\.sass)$/,
        loader: ['style-loader', 'css-loader?sourceMap, postcss-loader, sass-loader?sourceMap']
      }, {
        test: /\.(png|jpg|jpeg|gif|woff)$/,
        loader: 'url?limit=8192'
      }, {
        test: /\.(otf|eot|ttf)$/,
        loader: 'file?prefix=font/'
      }, {
        test: /\.svg$/,
        loader: 'file'
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3001,

    historyApiFallback: true,
    // respond to 404s with index.html
  },
  plugins: [
    HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false, debug: true, noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/',
        postcss: () => [autoprefixer]
      }
    })
  ]
};
