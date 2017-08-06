/// <reference path="../../../index.d.ts" />

import * as assert from 'assert'

export const expectThrow = async promise => {
  try {
    await promise
  } catch (error) {
    // TODO: Check jump destination to destinguish between a throw
    //       and an actual invalid jump.
    const invalidJump = error.message.search('invalid JUMP') >= 0

    // TODO: Found out in which circumstances 'invalid opcode' is throwed
    const invalidOpcode = error.message.search('invalid opcode') >= 0

    // TODO: When we contract A calls contract B, and B throws, instead
    //       of an 'invalid jump', we get an 'out of gas' error. How do
    //       we distinguish this from an actual out of gas event? (The
    //       testrpc log actually show an 'invalid jump' event.)
    const outOfGas = error.message.search('out of gas') >= 0
    assert(invalidJump || invalidOpcode || outOfGas, "Expected throw, got '" + error + "' instead")
    return
  }
  assert.fail('Expected throw not received')
}

export const mineBlocks = async function (num=1) {
  for (let i=0; i<num; ++i) {
    await new Promise(function(resolve, reject) { window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_mine", id: i }, function(err, result) { resolve(); }); })
  }
}

export const blockNumber = () => {
  return new Promise(function(resolve, reject) {
    window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "eth_blockNumber", id: 0x05 }, function(err, result) { resolve(parseInt(result.result)) })
  })
}

export const snapshot = () => {
  return new Promise(function(resolve, reject) {
    window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_snapshot", id: 0xabcd }, function(err, result) { resolve(); })
  })
}

export const revert = () => {
  return new Promise(function(resolve, reject) {
    window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_revert", id: 0xabcd }, function(err, result) { resolve(); })
  })
}

export const reset = () => {
  return new Promise(function(resolve, reject) {
    window.web3.currentProvider.sendAsync({ jsonrpc: "2.0", method: "evm_reset", id: 0xabce }, function(err, result) { resolve(); })
  })
}