import { isArray, isObject } from './common'

export const equal = (a, b) => {
  if (isArray(a) && isArray(b)) {
    return a.every((v, i) => equal(v, b[i])) && b.length == a.length
  } else if (isObject(a) && isObject(b)) {
    if (isArray(a) || isArray(b)) return false
    let aks = Object.keys(a)
    let bks = Object.keys(b)
    return aks.every((ak) => equal(a[ak], b[ak])) && aks.length == bks.length
  }
  return Object.is(a, b)
}
