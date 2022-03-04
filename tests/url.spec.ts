import { equal } from '@/index'
import { joinPath, objectToQueryStr, extractQueryStr } from '@/url'

describe('url utils', () => {
  it('joinPath', () => {
    const target = 'a/b/c/d'

    expect(joinPath('a/b/', '/c/', '/d/')).toBe(target)
    expect(joinPath('a/b', 'c', 'd')).toBe(target)
  })
  it('extractQueryStr', () => {
    expect(extractQueryStr('a=a&b=b')).deepEqualWith({ a: 'a', b: 'b' })
    expect(extractQueryStr('a=a&b=1&c=true&d=false')).deepEqualWith({ a: 'a', b: 1, c: true, d: false })
    expect(extractQueryStr('a=a&b=1&c=true&d=false')).deepEqualWith({ a: 'a', b: 1, c: true, d: false })
    expect(extractQueryStr('a=a&b=1&c=true&d=false', false)).deepEqualWith({ a: 'a', b: '1', c: 'true', d: 'false' })
    expect(extractQueryStr('a=l&b=o&c=v&d=e', (k, v) => k + '-' + v)).deepEqualWith({
      a: 'a-l',
      b: 'b-o',
      c: 'c-v',
      d: 'd-e'
    })

    expect(equal(extractQueryStr('http://ab.com?a=a&b=b'), { a: 'a', b: 'b' })).toBeTruthy()
  })
  it('objectToQueryStr', () => {
    expect(objectToQueryStr({ foo: 'a=b', ant: null, cat: undefined, bar: 2 })).toBe('?foo=a%3Db&bar=2')
  })
})
