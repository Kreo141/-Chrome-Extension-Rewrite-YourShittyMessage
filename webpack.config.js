const path = require('path');

module.exports = {
  mode: 'development', //  based on your needs
  entry: {
    background: './background.js',
  },
  output: {
    filename: 'background.js', // Name of the output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
