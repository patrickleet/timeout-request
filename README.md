# timeout-request

`fetch` doesn't time out.

this does.

Great for use with circuit breaker pattern.

```
import circuitBreaker from 'circuit-breaker-await-async'
import timeoutRequest from 'timeout-request'

let endpoint = 'https://api.com/stuff'
let getStuffFromEndpoint = new CircuitBreaker(
  timeoutRequest({
    method: 'get',
    endpoint,
    timeout: 5 * 1000 // 5s timeout
  }),
  {
    callTimeoutMs: 30 * 1000 // 30s delay between attempts
  }
)

try {
  let stuff = await getStuffFromEndpoint.call()
} catch (error) {
  if (error.message.includes('CIRCUIT_IS_OPEN')) {
    // handle error - this means it failed 10 times in a row
    // with delays between requests
  } else {
    throw error
  }
}

```

I've only used this for a get request, so will need modifications to support other stuff.

Needed to share it between projects though so I published as is!