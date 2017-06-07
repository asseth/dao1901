import React, {Component} from 'react';
import { connect } from 'react-redux';
import { web3Connect } from '../../redux/reducers/web3Reducer'

import './styles.scss';
import {Route} from 'react-router-dom';
// import PropTypes from 'prop-types';
//import CoreLayout from '../../component/Layouts/CoreLayout'
import TopBar from '../../component/TopBar'

// Redux
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {history} from '../../redux/store/createStore';

// Pages
import AdminPage from '../AdminContainer';
import HomePage from '../HomeContainer';
import ProposalSubmissionPage from '../ProposalSubmissionContainer';
import VotePage from '../VotesManagementContainer';
//import NotFoundPage from '../NotFoundContainer';

class AppContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount () {
    this.props.web3Connect() // check if web3 exists. metamask compatibility
  }

  render() {
    return (
      <div>
        <TopBar />

        <div className="m-top-30">
          <div className="row content">
            <div className="col"></div>
            <div className="col-8">
             <Provider store={this.props.store}>
               <ConnectedRouter history={history}>
                  <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/admin" component={AdminPage}/>
                    <Route path="/vote" component={VotePage}/>
                    <Route path="/proposal_submission" component={ProposalSubmissionPage}/>
                  </div>
                </ConnectedRouter>
              </Provider>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state- - -', state);
  return state;
}

const mapDispatchToProps = {
  web3Connect
}

//export default AppContainer;
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);