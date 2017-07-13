import {call, put} from 'redux-saga/effects'
import ipfsAPI from 'ipfs-api'
let ipfs = ipfsAPI('localhost', '5001')

export function* fetchIpfsInfo() {
  try {
    yield put({type: 'IPFS_ID_REQUESTED'})
    const info = yield call(ipfs.id)
    yield put({type: 'IPFS_ID_SUCCEED', info})
  } catch (e) {
    yield put({type: 'IPFS_ID_FAILED', e: e.message})
  }
}

/*
ipfs.add([new Buffer(stringToUse)], (err, res) => {
  if (err) throw err
  const hash = res[0].hash
  this.setState({added_file_hash: hash})

  ipfs.cat(hash, (err, res) => {
    if (err) throw err
    let data = ''
    res.on('data', (d) => {
      data = data + d
    })
    res.on('end', () => {
      this.setState({added_file_contents: data})
    })
  })

  ipfs.dht.findprovs(hash, (err, res) => {
    if (err) throw err
    console.log('found provs!')
    console.log(err, res)
  })
})
*/