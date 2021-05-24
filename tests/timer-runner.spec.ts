import { whileDelayRun } from '@/timer-runner'

jest.useFakeTimers()
describe('runner', () => {
  it('whileDelayRun', () => {
    const spy = jest.fn()

    var runner = whileDelayRun(spy, 1000)
    runner()
    runner()
    runner()
    jest.runAllTimers()
    expect(spy).toBeCalledTimes(1)
    runner()
    runner()
    jest.runAllTimers()
    expect(spy).toBeCalledTimes(2)
    runner()
    runner()

    let canceled = runner.cancel()
    jest.runAllTimers()
    expect(canceled).toBe(true)
    expect(spy).toBeCalledTimes(2)
    expect(runner.cancel()).toBe(false)
  })
})
