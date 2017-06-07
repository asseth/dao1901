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

export function createRequestTypes (base) {
  return [REQUESTED, SUCCEED, FAILED].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export default function action (type, payload = {}) {
  return {type, ...payload}
}