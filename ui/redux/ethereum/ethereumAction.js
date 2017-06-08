// ------------------------------------
// Actions
// ------------------------------------
export const blockNumberActions = {
  request: () => {'BLOCK_NUMBER_REQUESTED'},
  success: (blockNumber) => {'BLOCK_NUMBER_SUCCEED', blockNumber},
  failure: (error) => {'BLOCK_NUMBER_FAILED', error}
}