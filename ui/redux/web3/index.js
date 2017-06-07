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
    let web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`;
    //let actionNoWeb3 = { type: WEB3_DISCONNECTED, payload: { web3: null, isConnected: false } }

    if (typeof window.web3 !== 'undefined') {
      console.log('actionIsWeb3')
      dispatch({ type: WEB3_CONNECTED, payload: { web3: new Web3(window.web3.currentProvider), isConnected: true } })
    }
    else {
      console.log('actionIsNotWeb3')
      window.web3 = new Web3(new Web3.providers.HttpProvider(web3Location))
      console.log('web3 added to window')
      dispatch({ type: WEB3_CONNECTED, payload: { web3: window.web3, isConnected: true } })
    }
  }
};

export function web3Connected ({ web3, isConnected }) {
  return {
    type: WEB3_CONNECTED,
    payload: {
      web3,
      isConnected
    }
  }
}

export function web3Disconnected () {
  return {
    type: WEB3_DISCONNECTED,
    payload: {
      web3: null,
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