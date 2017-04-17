import React, {Component} from 'react';
import './styles.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory'
// const customHistory = createBrowserHistory();
// import PropTypes from 'prop-types';

import Menu from '../../component/Menu';
// Pages
import AdminPage from '../Admin';
import HomePage from '../Home';
import NotFoundPage from '../NotFound';
import ProposalSubmissionPage from '../ProposalSubmission';
import VotePage from '../Vote';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Menu />

        <div className="m-top-30">
          <div className="content">
            <Router>
              <div>
                <Route exact path="/" component={HomePage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/vote" component={VotePage} />
                {/*<Route path="/proposal_submission" component={ProposalSubmissionPage} />
                <Route path="*" component={NotFoundPage} />*/}
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

/*
App.contextTypes = {
  router: PropTypes.func.isRequired
};
*/

export default App