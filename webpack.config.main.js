const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge.smart(baseConfig, {
    target: 'electron-main',
    entry: {
        main: './app/main.ts'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, 'app', 'main.ts')
                ],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.node$/,
                loader: 'node-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
});
