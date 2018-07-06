const timeoutRequest = require('./index.js')

describe('timeoutRequest', () => {
  it('exists', () => {
    expect(timeoutRequest).toBeDefined()
  })

  it('returns a function that returns a promise', () => {
    let fn = timeoutRequest({
      endpoint: 'https://test.com'
    })

    expect(fn).toBeDefined()

    let p = fn()

    expect(p.then).toBeDefined()
  })
})

