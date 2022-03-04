import { AsyncCall, callFn } from '@/function'

describe('function utils', () => {
  it('AsyncCall', () => {
    const f1 = () => 1
    const f2 = async () => 2
    const f3 = () => Promise.resolve(3)

    async function assertCallRes(fn, res) {
      const spy = jest.fn().mockImplementation(fn)
      expect(await AsyncCall(spy, [1, 2])).toBe(res)
      expect(spy).lastCalledWith(1, 2)
    }
    assertCallRes(f1, 1)
    assertCallRes(f2, 2)
    assertCallRes(f3, 3)
  })

  it('callFn', () => {
    const obj = {
      name: 'xx'
    }

    const spy = jest.fn().mockImplementation(function () {
      return 'foo'
    })
    expect(callFn(spy)).toBe('foo')
    expect(callFn(spy, [1, 2])).toBe('foo')
    expect(spy).lastCalledWith(1, 2)
    expect(callFn(spy, undefined, [3, 4])).toBe('foo')
    expect(spy).lastCalledWith(3, 4)

    function f1() {
      return this.name
    }
    expect(callFn(f1, obj)).toBe('xx')
    expect(callFn(f1, f1)).toBe('f1')
  })
})
