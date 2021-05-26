import { equal } from '@/compare'
import { applyOption, classnames, deepCopy, getProp, pickProps, safeExtends, shallowCopy } from '@/index'

describe('utils', () => {
  it('safeExtends', () => {
    var a = { foo: 1 }
    var b = { bar: { zoo: 'zoo' }, foo: 2 }
    var res = safeExtends(a, b)
    expect(res.foo).toBe(1)
    expect(res).toBe(a)
    expect(res.bar.zoo).toBe('zoo')
  })
  it('getProp', () => {
    var foo = {
      one: 1,
      zoo: {
        two: 2
      },
      ant: null
    }
    expect(getProp(foo, 'one')).toBe(1)
    expect(getProp(foo, ['one'])).toBe(1)
    expect(getProp(foo, 'zoo.two')).toBe(2)
    expect(getProp(foo, ['zoo', 'two'])).toBe(2)
    expect(getProp(foo, 'zoo.three')).toBeUndefined()
    expect(getProp(foo, 'any.three')).toBeUndefined()
    expect(getProp(foo, 'ant.three')).toBeUndefined()
    expect(getProp(null, 'ant.three')).toBeUndefined()
  })
  it('pickProps', () => {
    var foo = {
      one: 1,
      zoo: {
        two: 2
      },
      three: 3
    }
    var bar = pickProps(foo, ['one', 'zoo'])
    expect(bar.one).toBe(foo.one)
    expect(bar.zoo).toBe(foo.zoo)
    expect(bar.three).toBeUndefined()
  })
  it('applyOption', () => {
    var foo = {
      bar: {
        two: 2
      }
    }
    var o1 = applyOption(foo, {
      zoo: {
        ant: 22
      },
      bar: {
        one: 1
      }
    })
    expect(o1.bar.one).toBe(1)
    expect(o1.bar.two).toBe(2)
    expect(o1.zoo.ant).toBe(22)
  })
  it('shallowCopy', () => {
    var target = {
      zoo: {
        ant: 22
      }
    }
    var copy = shallowCopy(target)
    expect(copy).not.toBe(target)
    expect(copy.zoo).toBe(target.zoo)
    expect(JSON.stringify(copy)).toBe(JSON.stringify(target))
  })
  it('deepCopy', () => {
    var target = {
      zoo: {
        ant: 22
      }
    }
    var copy = deepCopy(target)
    expect(copy).not.toBe(target)
    expect(copy.zoo).not.toBe(target.zoo)
    expect(JSON.stringify(copy)).toBe(JSON.stringify(target))
  })
  it('classnames', () => {
    var cls = 'a b c d'
    expect(classnames('a', ['b', { c: true, d: true, e: false }])).toBe(cls)
    expect(classnames('a', ['b', { c: true, d: true }])).toBe(cls)
    expect(classnames('a', ['b', ['c', 'd']])).toBe(cls)
    expect(classnames('a', 'b', 'c d')).toBe(cls)
    expect(classnames('a ', ' b', 'c d')).toBe(cls)
  })
  it('equal', () => {
    var objA: any = {
      a: '',
      b: [1, { foo: 2 }]
    }
    var objB: any = {
      a: '',
      b: [1, { foo: 2 }]
    }
    expect(equal(objA, objB)).toBeTruthy()
    objA.b.push(2)
    expect(equal(objA, objB)).toBeFalsy()
    objB.b.push(2)
    expect(equal(objA, objB)).toBeTruthy()
    var zoo = { a: 1 }
    objA.zoo = zoo
    expect(equal(objA, objB)).toBeFalsy()
    objB.zoo = zoo
    expect(equal(objA, objB)).toBeTruthy()
    delete objA.zoo
    expect(equal(objA, objB)).toBeFalsy()
    objA.zoo = { a: 1 }
    expect(equal(objA, objB)).toBeTruthy()

    expect(equal(1, 2)).toBeFalsy()
    expect(equal(0, null)).toBeFalsy()
    expect(equal([1, 2], [1, 2])).toBeTruthy()
    expect(equal({ '0': 1 }, [1])).toBeFalsy()
  })
})
