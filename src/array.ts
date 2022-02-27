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
