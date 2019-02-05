const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const spawn = require('child_process').spawn;

const baseConfig = require('./webpack.config.renderer');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch', './app/src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'app', 'src')],
        exclude: [path.resolve(__dirname, 'app', 'main.ts')],
        loaders: ['react-hot-loader/webpack', 'ts-loader']
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    before() {
      if (process.env.START_HOT) {
        console.log('--> Starting main process');
        spawn('yarn', ['start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  }
});
