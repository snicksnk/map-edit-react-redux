'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    // The entry file. All your app roots fromn here.
    entry: [
        path.join(__dirname, 'app/index.js')
    ],
    // Where you want the output to go
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'dist-production.js',
        publicPath: ''
    },
    plugins: [
        // webpack gives your modules and chunks ids to identify them. Webpack can vary the
        // distribution of the ids to get the smallest id length for often used ids with
        // this plugin
        new webpack.optimize.OccurenceOrderPlugin(),

        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'production-index.html'
        }),
        // extracts the css from the js files and puts them on a separate .css file. this is for
        // performance and is used in prod environments. Styles load faster on their own .css
        // file as they dont have to wait for the JS to load.
        new ExtractTextPlugin('[name]-[hash].min.css'),
        // handles uglifying js
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        // creates a stats.json
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    // ESLint options
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: true
    },

    module: {
        // Runs before loaders
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        // loaders handle the assets, like transforming sass to css or jsx to js.
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.jpe?g$|\.gif$|\.png$/,
            loader: "file"
        },
        {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, "node_modules"),
            loader: 'style-loader!css-loader'
        }, {
            test:   /\.css$/,
            //TODO Add production version
            include: path.resolve(__dirname, "app"),
            loader: "style!css?-minimize&modules&localIdentName=[name]-[local]--[hash:base64:5]&sourceMap!postcss"
        }, {
            test: /\.scss$/,
            // we extract the styles into their own .css file instead of having
            // them inside the js.
            loader: ExtractTextPlugin.extract('style', 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass')
        }, {
          test: /\.svg$/,
          loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
        },
        {
          test: /\.woff$/,
          loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
        },
        {
          test: /\.woff2$/,
          loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
        },
        {
          test: /\.[ot]tf$/,
          loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
        },
        {
          test: /\.eot$/,
          loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};
