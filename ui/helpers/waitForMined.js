// Check if Tx is mined
export default function waitForMined(tx, description) {
  return new Promise((resolve, reject) => {
    let setIntervalId = setInterval(() => web3.eth.getTransactionReceipt(tx, (err, receipt) => {
      if (err) reject(err.message)
      if (receipt) {
        console.log(`Receipt Tx ${description}: `, receipt)
        window.clearInterval(setIntervalId)
        resolve(receipt)
      }
    }), 1000)
  })
}
