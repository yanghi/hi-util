import { equal } from '@/compare'
import { excludeElement } from '@/array/index'
describe('array', () => {
  it('excludeElement', () => {
    expect(equal(excludeElement([1, 2, 3], [1, 2]), [3])).toBeTruthy()
    var foo = { a: 1 }
    expect(equal(excludeElement([1, 2, 3, foo], [{ a: 1 }]), [1, 2, 3])).toBeFalsy()
    expect(equal(excludeElement([1, 2, 3, foo], [foo]), [1, 2, 3])).toBeTruthy()
  })
})
