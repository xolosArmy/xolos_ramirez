const path = require('path');



module.exports = {
  entry: './public/script.js', // Entry point for your bundle
  output: {
    filename: 'bundle.js', // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
  },
  externals: {
    firebase: 'firebase', // Ignore Firebase
  },
  mode: 'development', // Set to 'production' for optimized builds
  module: {
    rules: [
      {
        test: /\.js$/, // Match all JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile ES6 code
          options: {
            presets: ['@babel/preset-env'], // Use preset-env to support older browsers
          },
        },
      },
    ],
  },
};
