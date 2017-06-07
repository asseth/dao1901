import action from '../actions'

export const ethereumCurrentBlockNumber = {
  request: currentBlockNumber => action('BLOCK_NUMBER_REQUESTED', {currentBlockNumber}),
  success: (currentBlockNumber, response) => action('BLOCK_NUMBER_SUCCEED', {currentBlockNumber, response}),
  failure: (currentBlockNumber, error) => action('BLOCK_NUMBER_FAILED', {currentBlockNumber, error}),
}