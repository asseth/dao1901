import Web3 from 'web3'
import truffleConfig from '../../../protocol/truffle.js';

// ------------------------------------
// Constants
// ------------------------------------
export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';

// ------------------------------------
// Actions
// ------------------------------------
// Called in AppContainer
export const web3Connect = () => {
  return (dispatch) => {
    // Check load event
    // avoids race conditions with web3 injection timing
    //window.addEventListener('load', function() {
      let web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`;
      //let actionNoWeb3 = { type: WEB3_DISCONNECTED, payload: { web3: null, isConnected: false } }
      if (typeof window.web3 !== 'undefined') {
        console.log('Web3 Detected on window')
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(window.web3.currentProvider)
        dispatch({type: WEB3_CONNECTED, payload: {isConnected: true}})
      }
      else {
        console.log('No Web3 Detected \nSet Web3')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider(web3Location))
        console.log('web3 added to window')
        dispatch({type: WEB3_CONNECTED, payload: {isConnected: true}})
      }
    //})
  }
};

export function web3Connected ({ isConnected }) {
  return {
    type: WEB3_CONNECTED,
    payload: {
      isConnected
    }
  }
}

export function web3Disconnected () {
  return {
    type: WEB3_DISCONNECTED,
    payload: {
      isConnected: false
    }
  }
}

export const actions = {
  web3Connect,
  web3Connected,
  web3Disconnected
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WEB3_CONNECTED]: (state, action) => {
    return action.payload
  },
  [WEB3_DISCONNECTED]: (state, action) => {
    return action.payload
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function Web3Reducer (state = {isConnected: false}, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}