export const excludeElement = (a: any[], b: any[]) => {
  var extarted = []
  for (let i = 0; i < a.length; i++) {
    const el = a[i]
    if (b.includes(el)) continue
    extarted.push(el)
  }
  return extarted
}

export function uniqueElement(a: any[]) {
  return [...new Set(a)]
}

export function sortBy(list: any[], from: any[], fn, slice = true) {
  const backup = list.map((value) => ({ value, index: -1 }))

  from.forEach((b, fi) => {
    const target = backup.find((a) => fn(a.value, b))
    if (target) {
      target.index = fi
    }
  })

  backup
    .sort((a, b) => a.index - b.index)
    .forEach((item, index) => {
      list[index] = item.value
    })

  if (slice && backup.length - from.length > 0) {
    list.splice(0, backup.length - from.length)
  }
  return list
}

/**
 * 删除符合条件的元素,并返回删除的元素数组,改变原数组
 * @example
 * var list = [1,2,3,4]
 * // list : [1,3], returns [2,4]
 * deleteElements(list, (el)=> el % 2 === 0);
 */
export function deleteElements<T extends any>(list: Array<T>, cb: (el: T) => boolean): T[] {
  const result = []

  let flag = -1
  for (let i = 0, len = list.length; i < len; i++) {
    let el = list[i]

    if (cb(el)) {
      result.push(el)
    } else {
      list[++flag] = el
    }
  }

  if (flag < list.length) {
    list.splice(flag + 1)
  }

  return result
}
