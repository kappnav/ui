const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  // There are other devtool options avaliable
  devtool: 'cheap-source-map',
  // devServer: {
  //   contentBase: './public',
  //   hot: true,
  // },
  // optimization: {
  //   // Recommendation from webpack guide to increase performance
  //   // for development environment
  //   removeAvailableModules: false,
  //   removeEmptyChunks: false,
  //   splitChunks: false,
  // },
  // output: {
  //   // Recommendation from webpack guide to increase performance
  //   // for development environment
  //   pathinfo: false,
  // },
});
