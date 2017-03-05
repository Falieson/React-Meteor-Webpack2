// const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolveMeteor(request, callback) {
  const match = request.match(/^meteor\/(.+)$/);
  const pack = match && match[1];

  if (pack) {
    callback(null, `Package["${pack}"]`);
    return true;
  }
  return false;
}

function resolveExternals(context, request, callback) {
  return resolveMeteor(request, callback) ||
  callback();
}


const config = {
  entry: {
    app: './client/main.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'imports/api'),
      lib: path.resolve(__dirname, 'imports/lib'),
      server: path.resolve(__dirname, 'imports/server'),
      startup: path.resolve(__dirname, 'imports/startup'),
      ui: path.resolve(__dirname, 'imports/ui'),
    },
    extensions: ['.jsx', '.js', '.json'],
  },
  externals: [
    {
      sharp: '{}',
    },
    resolveExternals,
  ],
  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      { // QUESTION: shouldn't this be loading the jsx?
        test: /\.js$/,
        exclude: [/node_modules/, /meteor/],
        loaders: ['babel-loader'],
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'html-loader?minimize=false' },
      { test: /\.styl$/, loader: 'css-loader!stylus-loader' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'], // sass-loader not scss-loader
      },
      { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]' },
      {
        test: /\.woff2?$/,
        loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff',
      },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=dist/fonts/[name].[ext]' },
    ],
  },
  plugins: [
    // NOTE: NG and TS stuff ~Falieson
    // Workaround for angular/angular#11580
    // new webpack.ContextReplacementPlugin(
    //  /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    //  path.resolve(__dirname, './client'), // location of source
    //  {}, // a map of your routes
    // ),
    // new webpack.ProvidePlugin({
    //   __extends: 'typescript-extends',
    // }),
    new HtmlWebpackPlugin({
      title: 'React-Meteor-Webpack2',
      template: path.resolve(__dirname, './client/main.html'),
      showErrors: true,
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __dirname: true,
  },
};

module.exports = config;
