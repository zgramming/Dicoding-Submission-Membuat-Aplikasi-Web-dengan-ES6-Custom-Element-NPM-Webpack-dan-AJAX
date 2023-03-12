const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true, // optional, but you must not set both hot and liveReload to true
    liveReload: true,
    watchFiles: ["./src/*"], // string [string] object [object]
  },
});
