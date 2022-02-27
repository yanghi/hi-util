import { equal } from '@/index'
import { joinPath, objectToQueryStr, extractQueryStr } from '@/url'
// import {}
describe('url utils', () => {
  it('joinPath', () => {
    const target = 'a/b/c/d'

    expect(joinPath('a/b/', '/c/', '/d/')).toBe(target)
    expect(joinPath('a/b', 'c', 'd')).toBe(target)
  })
  it('extractQueryStr', () => {
    expect(equal(extractQueryStr('a=a&b=b'), { a: 'a', b: 'b' })).toBeTruthy()
    expect(equal(extractQueryStr('a=a&b=1&c=true&d=false'), { a: 'a', b: 1, c: true, d: false })).toBeTruthy()
    expect(equal(extractQueryStr('http://ab.com?a=a&b=b'), { a: 'a', b: 'b' })).toBeTruthy()
  })
  it('objectToQueryStr', () => {
    expect(objectToQueryStr({ foo: 'a=b', ant: null, cat: undefined, bar: 2 })).toBe('?foo=a%3Db&bar=2')
  })
})
