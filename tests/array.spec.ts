import { equal } from '@/compare'
import { deleteElements, excludeElement, sortBy } from '@/array'
describe('array', () => {
  it('excludeElement', () => {
    expect(equal(excludeElement([1, 2, 3], [1, 2]), [3])).toBeTruthy()
    var foo = { a: 1 }
    expect(equal(excludeElement([1, 2, 3, foo], [{ a: 1 }]), [1, 2, 3])).toBeFalsy()
    expect(equal(excludeElement([1, 2, 3, foo], [foo]), [1, 2, 3])).toBeTruthy()
  })
  it('sortBy', () => {
    const arr_1 = [1, 3, 5, 7]
    const from_1 = [3, 7, 5, 1]
    const miss_from_1 = [7, 3, 1]

    const sort_1 = (a, b) => b === a
    expect(sortBy(arr_1, from_1, sort_1)).deepEqualWith(from_1)
    expect(arr_1).deepEqualWith(from_1)

    const sorted = sortBy(arr_1, miss_from_1, sort_1)
    expect(sorted).deepEqualWith(miss_from_1)
    expect(sorted).toBe(arr_1)
    expect(arr_1).deepEqualWith(miss_from_1)

    const arr_2 = [4, 1, 2]
    const miss_from_2 = [4, 2]

    const sorted_2 = sortBy(arr_2, miss_from_2, sort_1, false)
    expect(sorted_2).deepEqualWith([1, 4, 2])
    expect(sorted_2).toBe(arr_2)

    const arr_3 = [{ a: 2 }, { a: 3 }, { a: 1 }]
    const form_3 = [{ a: 1 }, { a: 3 }, { a: 2 }]

    expect(sortBy(arr_3, form_3, (a, b) => a.a === b.a)).deepEqualWith(form_3)
  })

  it('deleteElements', () => {
    const list_1 = [1, 2, 3, 4, 5]

    const del_1 = deleteElements(list_1, (el) => el % 2 === 0)

    expect(del_1).deepEqualWith([2, 4])
    expect(list_1).deepEqualWith([1, 3, 5])

    const list_2 = [1, 2, 3, 4, 5]

    const del_2 = deleteElements(list_2, (el) => el <= 3)
    expect(list_2).deepEqualWith([4, 5])
    expect(del_2).deepEqualWith([1, 2, 3])

    const list_3 = [1, 2, 3, 4, 5]

    const del_3 = deleteElements(list_3, (_) => false)
    expect(list_3).deepEqualWith([1, 2, 3, 4, 5])
    expect(del_3).deepEqualWith([])
  })
})
