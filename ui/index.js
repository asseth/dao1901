import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/index';
import 'babel-polyfill';

// Global styles
import './theme/app.scss';
import './theme/customizations.scss';

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
