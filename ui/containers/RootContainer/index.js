import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import './styles.scss'
import {Route} from 'react-router-dom'
// import PropTypes from 'prop-types';
import TopBar from '../../components/common/TopBar'
import DevTools from '../../components/common/DevTools'
// Redux
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {history, sagaMiddleware} from '../../redux/createStore'
// Pages
// import TestPage from '../TestContainer';
import AdminPage from '../AdminContainer'
import HomePage from '../HomeContainer'
import ProposalSubmissionPage from '../ProposalSubmissionContainer'
import VotePage from '../VotesManagementContainer'
//import NotFoundPage from '../NotFoundContainer';
/**
 * RootContainer
 * Root component, core layout, route handling, web3 setup
 */
class RootContainer extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div>
            <TopBar />
            <div className="container m-top-50">
              <div className="row">
                <div className="col-12">
                  <div>
                    {/*<Route exact path="/" component={TestPage}/>*/}
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/admin" component={AdminPage}/>
                    <Route path="/vote" component={VotePage}/>
                    <Route path="/proposal_submission" component={ProposalSubmissionPage}/>
                    {/*<DevTools />*/}
                    <ReduxToastr
                      timeOut={8500}
                      newestOnTop={true}
                      preventDuplicates
                      position="top-right"
                      transitionIn="bounceIn"
                      transitionOut="bounceOut"
                      progressBar={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>

    )
  }
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps)(RootContainer)