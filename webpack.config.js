const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: {
		'app': './client/main'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: 'http://localhost:8080/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts', '.es6', '.js', '.json']
	},
	externals: [
		{
			sharp: '{}'
		},
		resolveExternals
	],
	devtool: 'cheap-module-eval-source-map',

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/, /meteor/], loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{test: /\.json$/, loader: 'json-loader'},
			{test: /\.html/, loader: 'html-loader?minimize=false'},
			{test: /\.styl$/, loader: 'css-loader!stylus-loader'},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'})
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
			},
			{test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]'},
			{
				test: /\.woff2?$/,
				loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
			},
			{test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=dist/fonts/[name].[ext]'}
		]
	},
	plugins: [
		// Workaround for angular/angular#11580
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			path.resolve(__dirname, './client'), // location of source
			{} // a map of your routes
		),
		new webpack.ProvidePlugin({
			__extends: 'typescript-extends'
		}),
		new HtmlWebpackPlugin({
			title: 'Angular-Meteor-Webpack',
			template: path.resolve(__dirname, './client/index.html'),
			showErrors: true
		}),
	],
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		__dirname: true
	}
};

function resolveExternals(context, request, callback) {
	return resolveMeteor(request, callback) ||
		callback();
}

function resolveMeteor(request, callback) {
	var match = request.match(/^meteor\/(.+)$/);
	var pack = match && match[1];

	if (pack) {
		callback(null, 'Package["' + pack + '"]');
		return true;
	}
}

module.exports = config;
