import { equal, isEmpty, pickProps } from '@/index'
import { assignProp, deleteProp, objectToArr } from '@/object'

describe('object utils', () => {
  const target = () => ({ foo: 1, bar: 1, ant: null, cat: undefined })
  const targetConst = target() as Readonly<ReturnType<typeof target>>

  it('deleteProp', () => {
    const t1 = target()
    expect(
      equal(
        deleteProp(t1, (key, val, obj) => {
          expect(obj).toBe(t1)
          return val === 1 || val == null
        }),
        targetConst
      )
    ).toBeTruthy()
    expect(isEmpty(t1)).toBeTruthy()

    const t2 = target()

    expect(
      deleteProp(
        t2,
        (key, val) => val === 1,
        (key, val) => val == null
      )
    ).deepEqualWith(targetConst)
    expect(isEmpty(t2)).toBeTruthy()
  })
  it('assignProp', () => {
    const props_1 = { foo: 'foo', bar: 'bar', cat: 'cat', zero: 0, ant: 'ant' }
    const props_2 = { foo: 'foo', cat: 'cat', zero: 0 }

    const t1 = target()
    expect(assignProp(t1, props_1, 'nil')).deepEqualWith(
      Object.assign(target(), pickProps(props_1, ['zero', 'cat', 'ant']))
    )
    expect(t1.foo).toBe(targetConst.foo)
    expect(t1.bar).toBe(targetConst.bar)

    const t2 = target()
    expect(assignProp(t2, props_1, 'always')).deepEqualWith(Object.assign(target(), props_1))
    expect(t2.foo).toBe(props_1.foo)
    expect(t2.bar).toBe(props_1.bar)

    const t3 = target()
    expect(assignProp(t3, props_2, 'miss')).deepEqualWith(Object.assign(target(), pickProps(props_2, ['zero'])))

    const t4 = target()
    expect(assignProp(t4, props_2, 'undefined')).deepEqualWith(
      Object.assign(target(), pickProps(props_2, ['zero', 'cat']))
    )

    const t5 = target()
    // same as 'nil'
    expect(assignProp(t1, props_1)).deepEqualWith(Object.assign(target(), pickProps(props_1, ['zero', 'cat', 'ant'])))
    expect(t5.foo).toBe(targetConst.foo)
    expect(t5.bar).toBe(targetConst.bar)
  })
  it('objectToArr', () => {
    const obj = { a: 1, b: 2 }

    expect(objectToArr(obj, (_, v) => v)).deepEqualWith([1, 2])
    expect(objectToArr(obj)).deepEqualWith([1, 2])
    expect(objectToArr(obj, (k, v) => ({ k, v }))).deepEqualWith([
      { k: 'a', v: 1 },
      { k: 'b', v: 2 }
    ])
  })
})
