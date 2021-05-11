import { safeExtends } from '@/index'

describe('utils.common', () => {
  it('safeExtends', () => {
    var a = { foo: 1 }
    var b = { bar: { zoo: 'zoo' }, foo: 2 }
    var res = safeExtends(a, b)
    expect(res.foo).toBe(1)
  })
})
