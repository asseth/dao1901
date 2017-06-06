/**
 * Sagas Actions
 */

/**
 * Constants
 * @type {string}
 */
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

const CONNEXION = createRequestTypes('CONNEXION')
const MEMBERS = createRequestTypes('MEMBERS')

const USER = createRequestTypes('USER')
const USER_ADDRESS = createRequestTypes('USER_ADDRESS')
const USER_BALANCE = createRequestTypes('USER_BALANCE')

const DAO_OWNER_ADDRESS = createRequestTypes('DAO_OWNER_ADDRESS')

const DAO_CONTRACT_ADDRESS_OWNED = createRequestTypes('DAO_CONTRACT_ADDRESS_OWNED')
const DAO_CONTRACT_ADDRESS_MEMBERS = createRequestTypes('DAO_CONTRACT_ADDRESS_MEMBERS')
const DAO_CONTRACT_ADDRESS_VOTES = createRequestTypes('DAO_CONTRACT_ADDRESS_VOTES')



function action(type, payload = {}) {
  return {type, ...payload}
}

export const connexion = {
  request: currentBlockNumber => action(CONNEXION.REQUEST, {currentBlockNumber}),
  success: (currentBlockNumber, response) => action(CONNEXION.SUCCESS, {currentBlockNumber, response}),
  failure: (currentBlockNumber, error) => action(CONNEXION.FAILURE, {currentBlockNumber, error}),
}

export const members = {
  request: address => action(MEMBERS.REQUEST, {address}),
  success: (address, response) => action(MEMBERS.SUCCESS, {address, response}),
  failure: (address, error) => action(MEMBERS.FAILURE, {address, error}),
}

export const organization = {
  request: ownerAddress => action(ORGANIZATION.REQUEST, {ownerAddress}),
  success: (ownerAddress, response) => action(ORGANIZATION.SUCCESS, {ownerAddress, response}),
  failure: (ownerAddress, error) => action(ORGANIZATION.FAILURE, {ownerAddress, error}),
}

export const userAddress = {
  request: () => action(USER_ADDRESS.REQUEST),
  success: (address, response) => action(USER_ADDRESS.SUCCESS, {address, response}),
  failure: (address, error) => action(USER_ADDRESS.FAILURE, {address, error}),
}