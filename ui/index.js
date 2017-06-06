import React from 'react';
import ReactDOM from 'react-dom';
//import dao1901 from 'dao1901-truffle-library';
import AppContainer from './containers/AppContainer/index'
import createStore from './redux/store/createStore';

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
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
let render = () => {
  ReactDOM.render(
    <AppContainer store={store}/>,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()