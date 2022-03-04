import { isObject, equal } from 'hi-util'

expect.extend({
  deepEqualWith(received, actual) {
    const passed = equal(received, actual)

    if (passed) {
      return { pass: true, message: () => `expected is equal` }
    } else {
      return {
        pass: false,
        message: () =>
          `expected not deep equal\nexpected: \n${JSON.stringify(actual, null, 2)}\nreceived: \n${JSON.stringify(
            received,
            null,
            2
          )}`
      }
    }
  }
})
