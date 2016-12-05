const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app/js/main'),
  devServer: {
    outputPath: path.join(__dirname, 'build'),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: "sourcemap",
  output: {
    path: path.resolve(__dirname, 'build/js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'app/static'),
        from: '**/*',
        to: path.resolve(__dirname, 'build'),
      },
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.sol$/,
        loaders: ['web3', 'solc'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel'],
        query: {
          presets: ['latest', 'react'],
          plugins: ["transform-function-bind"]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?hash=sha512&digest=hex&name=[hash].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  },
  web3Loader: {
    // Web3
    provider: 'http://localhost:8545',

    // Specify contract constructor parameters, if any.
    // constructorParams: {
    //   ContractOne: [ 'param1_value', 'param2_value' ]
    // }
    constructorParams: {},

    // To use deployed contracts instead of redeploying, include contract addresses in config
    // deployedContracts: {
    //   ContractOne: '0x...........',
    //   ContractTwo: '0x...........',
    // }
    deployedContracts: {}
  }
};
