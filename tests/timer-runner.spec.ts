import { trueFn } from '@/common'
import { sleep } from '@/timer'
import { delayRunLast, limitDuplication, voteRunOnce, whileDelayRun } from '@/timer-runner'

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
  it('voteRunOnce', async () => {
    const spy = jest.fn()

    var a1 = voteRunOnce(trueFn, spy, 100, true)
    expect(spy).toBeCalledTimes(1)
    expect(a1()).toBeFalsy()
    var c = false
    var fakeCondition = () => {
      c = false
      setTimeout(() => {
        c = true
      }, 200)
    }
    var foo = () => {
      return c
    }
    var a2 = voteRunOnce(foo, spy, 100)
    jest.runOnlyPendingTimers()

    expect(spy).toBeCalledTimes(1)
    expect(a2()).toBeTruthy()

    expect(spy).toBeCalledTimes(1)
    fakeCondition()
    expect(foo()).toBeFalsy()

    var a3 = voteRunOnce(foo, spy, 300)
    jest.runOnlyPendingTimers()
    expect(spy).toBeCalledTimes(2)
    expect(a3()).toBeFalsy()

    jest.useRealTimers()
    fakeCondition()
    var a4 = voteRunOnce(foo, spy, 100)
    spy.mockReset()
    const e1 = () => {
      return new Promise((r) => {
        setTimeout(() => {
          r(1)
          expect(spy).toBeCalledTimes(0)
        }, 200)
      })
    }
    await e1()
    const e2 = () => {
      return new Promise((r) => {
        setTimeout(() => {
          r(1)
          expect(spy).toBeCalledTimes(1)
        }, 200)
      })
    }
    await e2()
    expect(a4()).toBeFalsy()
    jest.useFakeTimers()
  })
  it('limitDuplication', async () => {
    const spy = jest.fn()
    const run = limitDuplication(spy, 100)
    spy.mockReturnValueOnce('foo')
    var r1 = run(1, 2)
    run(2)
    run(3)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(r1).toBe('foo')
    expect(spy).toHaveBeenCalledWith(1, 2)
    jest.useRealTimers()
    await sleep(101)
    run()
    expect(spy).toBeCalledTimes(2)
    await sleep(100)
    run()
    run()
    run()
    expect(spy).toBeCalledTimes(3)

    jest.useFakeTimers()
  })
  it('delayRunLast', async () => {
    jest.useRealTimers()

    let spy = jest.fn()
    var run = delayRunLast(spy, 100)
    run(1)
    run(1)
    run(1, 2)
    expect(spy).not.toBeCalled()
    await sleep(100)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(1, 2)

    run(1)
    run(2)
    await sleep(100)
    expect(spy).toBeCalledTimes(2)

    jest.useFakeTimers()
  })
})
