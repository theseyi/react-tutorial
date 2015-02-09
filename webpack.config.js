module.exports = {
  entry: './src/entry.js',
  output: {
    path: 'static/bundle',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js(?:x)?$/,
      loader: 'jsx-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};
