const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
let HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/ui/index.html',
  filename: 'index.html',
  inject: 'body',
})
const bootstrapEntryPoints = require('./webpack.bootstrap.config')

let isProd = process.env.NODE_ENV === 'production'
let bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev


module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch', // RHL patch
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080', // todo check if it's necessary
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server', // todo check if it's necessary
      'babel-polyfill',
      './ui/index.js',
    ],
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, 'ui', 'public'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // Copy our app's index.html to the public folder.
    new CopyWebpackPlugin([
      {from: './ui/index.html', to: "index.html"},
      {from: './ui/assets/images', to: "images"}
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
    }),
    new FaviconsWebpackPlugin({
      logo: './ui/assets/images/Dao1901Logo.png',
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      },
      // Inject the html into the html-webpack-plugin
      inject: true
    }),
    HTMLWebpackPluginConfig
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?module&importLoaders=1&localIdentName=[local]_[hash:base64:5]',
          'postcss-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            //'transform-react-jsx',
            [
              'react-css-modules',
              {
                "generateScopedName": "[local]_[hash:base64:5]",
                "filetypes": {
                  ".scss": "postcss-scss"
                },
                "webpackHotModuleReloading": true
              }
            ]
          ]
        },
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
    hot: true, // enable HMR on the server
    historyApiFallback: true
    //publicPath: path.join(__dirname, "ui", "public")
  },
  performance: {
    //hints: "warning"
  }
};
