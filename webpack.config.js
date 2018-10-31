var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: __dirname +'/src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      enforce: "pre", // preload the jshint loader
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      use: {
          loader: "babel-loader"
        }
    },
    {
      test: /\.(scss|css)$/,
      loader: ['style-loader', 'css-loader']
    }]
  },
};