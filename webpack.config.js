const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

// Webpack config file
module.exports = {
  entry: {
      app:  './views/Default.jsx'
  },
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  devServer: {
   contentBase: path.resolve(__dirname, './'),  // New
 },

 resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!resolve-url-loader!sass-loader'
            }
        ]
    },
  watch: true
};