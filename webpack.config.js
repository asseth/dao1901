module.exports = (env = {}) => {
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
  const isProd = env.production === true
  return {
    entry: {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch', // RHL patch
        // bundle the client for webpack-dev-server and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8085', // todo check if it's necessary
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server', // todo check if it's necessary
        './ui/index.js',
      ]
    },
    output: {
      path: path.resolve(__dirname, 'ui', 'public'),
      filename: '[name].bundle.js',
      publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    //devtool: 'source-map',
    plugins: [
      // webpack3 scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      // Copy our app's index.html to the public folder.
      new CopyWebpackPlugin([
        {from: './ui/index.html', to: "index.html"},
        {from: './ui/assets/images', to: "images"}
      ]),
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
          include: [/ui\/assets\/theme\/app\.css/, /ui\/assets\/theme\/custom\.css/],
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "postcss-loader"
          }]
        },
        {
          test: /\.css$/,
          exclude: [/ui\/assets\/theme\/app\.css/, /ui\/assets\/theme\/custom\.css/],
          use: [{
            loader: "style-loader",
            options: {}
          }, {
            loader: "css-loader",
            options: {
              importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              localIdentName: '[local]_[hash:base64:5]',
              modules: true
            }
          }, {
            loader: "postcss-loader"
          }]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: [
              'transform-react-jsx',
              [
                'react-css-modules',
                {
                  generateScopedName: '[local]_[hash:base64:5]',
                  //webpackHotModuleReloading: true
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
      port: 8085,
      hot: true, // enable HMR on the server
      historyApiFallback: true
      //publicPath: path.join(__dirname, "ui", "public")
    },
    performance: {
      hints: false
    }
  }
}
