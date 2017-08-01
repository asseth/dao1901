import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import RootContainer from './containers/RootContainer'
import store from './redux/createStore'
// Global styles
import './assets/theme/app.css'

// ========================================================
// Render Setup
// ========================================================
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store}/>
    </AppContainer>,
    document.getElementById('root')
  )
}

// ========================================================
// Go!
// ========================================================
render(RootContainer)