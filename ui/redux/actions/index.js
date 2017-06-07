/**
 * Sagas Actions
 */

/**
 * Constants
 * @type {string}
 */
const REQUESTED = 'REQUESTED'
const SUCCEED = 'SUCCEED'
const FAILED = 'FAILED'

function createRequestTypes(base) {
  return [REQUESTED, SUCCEED, FAILED].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

const MEMBERS = createRequestTypes('MEMBERS')

const USER = createRequestTypes('USER')
const USER_ADDRESS = createRequestTypes('USER_ADDRESS')
const USER_BALANCE = createRequestTypes('USER_BALANCE')

const DAO_OWNER_ADDRESS = createRequestTypes('DAO_OWNER_ADDRESS')

const DAO_CONTRACT_ADDRESS_OWNED = createRequestTypes('DAO_CONTRACT_ADDRESS_OWNED')
const DAO_CONTRACT_ADDRESS_MEMBERS = createRequestTypes('DAO_CONTRACT_ADDRESS_MEMBERS')
const DAO_CONTRACT_ADDRESS_VOTES = createRequestTypes('DAO_CONTRACT_ADDRESS_VOTES')



export default function action(type, payload = {}) {
  return {type, ...payload}
}

export const members = {
  request: address => action(MEMBERS.REQUESTED, {address}),
  success: (address, response) => action(MEMBERS.SUCCEED, {address, response}),
  failure: (address, error) => action(MEMBERS.FAILED, {address, error}),
}

export const dao = {
  request: ownerAddress => action(ORGANIZATION.REQUESTED, {ownerAddress}),
  success: (ownerAddress, response) => action(ORGANIZATION.SUCCEED, {ownerAddress, response}),
  failure: (ownerAddress, error) => action(ORGANIZATION.FAILED, {ownerAddress, error}),
}

export const userAddress = {
  request: () => action(USER_ADDRESS.REQUESTED),
  success: (address, response) => action(USER_ADDRESS.SUCCEED, {address, response}),
  failure: (address, error) => action(USER_ADDRESS.FAILED, {address, error}),
}