// Allows us to use ES6 in our migrations and tests.
require('babel-register')
require("babel-polyfill")


module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',        // Match any network id
      before_timeout: 200000, // specify Mocha timeout per network
      test_timeout: 300000    // specify Mocha timeout per network
    },
    kovan: {
      host: 'localhost',
      port: 8545,
      network_id: '42',
      gas:4900000
    }
  },
  mocha: {
    timeout: 200000,
    useColors: true
  }
}
