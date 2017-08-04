import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RootContainer from './containers/RootContainer'
import store from './redux/createStore'
// Global styles
import './assets/theme/app.css'

// ========================================================
// Render Setup
// ========================================================
const render = Component => {
  ReactDOM.render(<Component store={store}/>, document.getElementById('root'))
}

// ========================================================
// Go!
// ========================================================
render(RootContainer)