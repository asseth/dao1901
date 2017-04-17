const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const webpack = require('webpack');

let isProd = process.env.NODE_ENV === 'production';
let bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;


module.exports = {
  entry: {
    app: './ui/index.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, 'ui', 'public'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // Copy our app's index.html to the public folder.
    new CopyWebpackPlugin([
      {from: './ui/index.html', to: "index.html"},
      {from: './ui/images', to: "images"}
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(woff2?)$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    // Automatically resolve these extensions
    extensions: [".js", ".jsx", ".json"]
  },
  devServer: {
    contentBase: path.join(__dirname, "ui", "public"),
    compress: true,
    //open: true,
    port: 8080,
    //hot: true,
    historyApiFallback: true
    //publicPath: path.join(__dirname, "ui", "public")
  }
};
