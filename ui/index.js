import React from 'react';
import ReactDOM from 'react-dom';
//import dao1901 from 'dao1901-truffle-library';

import App from './containers/AppContainer/index';
import 'babel-polyfill';

// Global styles
import './assets/theme/app.scss';
import './assets/theme/customizations.scss';


// Expose Dao1901Members globally
//window.Dao1901Members = dao1901.Dao1901Members;
// Expose Dao1901Votes globally
//window.Dao1901Votes = dao1901.Dao1901Votes;
// Expose Owned globally
//window.Owned = dao1901.Owned;

// Set default account
web3.eth.getAccounts((err, accounts) => {
  if (err) {
    throw new Error(err.message);
  }
  web3.eth.defaultAccount = accounts[0];
  console.log(`Set the default account to: ${web3.eth.defaultAccount}`);
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
