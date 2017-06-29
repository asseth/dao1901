import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import RootContainer from './containers/RootContainer'
import createStore, {sagaMiddleware} from './redux/createStore'
// Global styles
import './assets/theme/app.scss'

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
if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => {
    render(RootContainer)
  })

  module.hot.accept('./redux/reducersIndex', () => {
    const reducers = require('./redux/reducersIndex').default
    return store.replaceReducer(reducers)
  })

  /*
  module.hot.accept('./redux/rootSaga', () => {
    const newSagas = require('./redux/rootSaga').default
    sagaTask.cancel()
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(newSagas)
    })
  })
  */
}