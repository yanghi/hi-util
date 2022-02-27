import { isObject, equal } from 'hi-util'

expect.extend({
  toDeepEqual(received, actual) {
    const passed = equal(received, actual)

    if (passed) {
      return { pass: true, message: () => `expected is equal` }
    } else {
      return {
        pass: false,
        message: () =>
          `expected not deep equal received: \n${JSON.stringify(received, null, 2)}\nactual: \n${JSON.stringify(
            actual,
            null,
            2
          )}`
      }
    }
  }
})
