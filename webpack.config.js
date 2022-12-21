const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/index.ts'),
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],

			},
			{ test: /\.ts$/, loader: "ts-loader" },
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js',/* other extentions */]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
	],
	experiments: {
		topLevelAwait: true
	}
};
