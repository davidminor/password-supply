var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './scripts/index'
  ],
  output: {
    path: './build/scripts/',
    filename: 'bundle.js',
    publicPath: 'scripts/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['jsx?harmony'], exclude: /node_modules/ },
    ]
  }
};
