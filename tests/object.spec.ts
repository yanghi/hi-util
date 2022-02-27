import { equal, isEmpty } from '@/index'
import { deleteProp } from '@/object'
// import {}
describe('object utils', () => {
  it('deleteProp', () => {
    const target = () => ({ foo: 1, bar: 1, ant: null, cat: undefined })
    const targetConst = target()
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
      equal(
        deleteProp(
          t2,
          (key, val) => val === 1,
          (key, val) => val == null
        ),
        targetConst
      )
    ).toBeTruthy()
    expect(isEmpty(t2)).toBeTruthy()
  })
})
