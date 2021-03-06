const debug = require('debug')('timeout-request')
const r2 = require('r2')

module.exports = function timeoutRequest ({
  method = 'get',
  endpoint,
  timeout = 5000
}) {
  return () => {
    debug({ msg: 'executing timeout request', method, endpoint, timeout })
    return new Promise(async function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('Request timed out'))
      }, timeout)

      try {
        let res = await r2[method](endpoint).response
        const data = await res.json()
        debug({ msg: 'timeout request succeeded', method, endpoint, timeout })
        resolve(data)
      } catch (e) {
        debug({ msg: 'timeout request failed', method, endpoint, timeout, e })
        reject(new Error(`request failed - ${e.message}`))
      }
    })
  }
}