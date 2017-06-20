import React, {Component} from 'react'
import {connect} from 'react-redux'
import {web3Connect} from '../../redux/web3'
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
import rootSaga from '../../redux/sagasIndex'

/**
 * RootContainer
 * Root component, core layout, route handling, web3 setup
 */
class RootContainer extends Component {
  constructor(props, context) {
    super(props, context)
  }

  /**
   * Initial bootstraping
   */
  componentDidMount() {
    // Inject web3 in redux store after waiting in case of Metamask injection takes more time
    setTimeout(() => {
      this.props.web3Connect()
      // Then we can run the sagas
      sagaMiddleware.run(rootSaga)
    }, 50)
  }

  render() {
    return (
      <div>
        <TopBar />

        <div className="container m-top-50">
          <div className="row">
            <div className="col-12">
              <Provider store={this.props.store}>
                <ConnectedRouter history={history}>
                  <div>
                    {/*<Route exact path="/" component={TestPage}/>*/}
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/admin" component={AdminPage}/>
                    <Route path="/vote" component={VotePage}/>
                    <Route path="/proposal_submission" component={ProposalSubmissionPage}/>
                    <DevTools />
                    <ReduxToastr
                      timeOut={10000}
                      newestOnTop={true}
                      preventDuplicates
                      position="top-right"
                      transitionIn="bounceIn"
                      transitionOut="bounceOut"
                      progressBar={true}
                    />
                  </div>
                </ConnectedRouter>
              </Provider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => state
const mapDispatchToProps = {
  web3Connect
}
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)