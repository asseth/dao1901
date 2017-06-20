import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
//import dao1901 from 'dao1901-truffle-library';
import RootContainer from './containers/RootContainer'
import createStore, {sagaMiddleware} from './redux/createStore';

// Global styles
import './assets/theme/app.scss';

// ========================================================
// Expose contracts globally
// ========================================================
// Expose Dao1901Members globally
//window.Dao1901Members = dao1901.Dao1901Members;
// Expose Dao1901Votes globally
//window.Dao1901Votes = dao1901.Dao1901Votes;
// Expose Owned globally
//window.Owned = dao1901.Owned;

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore()

// ========================================================
// Render Setup
// ========================================================
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store}/>
    </AppContainer>,
    document.getElementById('root')
  );
}

// ========================================================
// Go!
// ========================================================
render(RootContainer)
// ======================================================
// HMR Setup
// ======================================================
//store.asyncReducers = {}
// To unsubscribe, invoke `store.unsubscribeHistory()` anytime
//store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
if (module.hot) {
  console.log('HMR activated---------', module)
  module.hot.accept('./containers/RootContainer', () => {
    render(RootContainer)
  });

  module.hot.accept('./redux/reducersIndex', () => {
    const reducers = require('./redux/reducersIndex').default;
    return store.replaceReducer(reducers);
  });

  /*
  module.hot.accept('./redux/sagas', () => {
    const newSagas = require('./redux/sagasIndex').default;
    sagaTask.cancel()
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(newSagas);
    })
  })
  */
}