import 'babel-polyfill';
import './exposeContracts';
import '../static/stylesheet.css';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import React from 'react';
import {render} from 'react-dom';
import App from './component/App';
// Pages
import Home from './component/Home';
import Owned from './component/Owned';
import Members from './component/Members';
import Votes from './component/Dao1901Votes/VotesContainer';
import Web3 from './component/Web3';
render(
  (
    <div className="shell">
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          {/* add the routes here */}
          <Route path="/home" component={Home}/>
          <Route path="/members" component={Members}/>
          <Route path="/votes" component={Votes}/>
          <Route path="/owned" component={Owned}/>
          <Route path="/web3" component={Web3}/>
        </Route>
      </Router>
    </div>
  ), document.getElementById('root')
);
