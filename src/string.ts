export function stringValue(str: string) {
  if (str === 'false') return false
  if (str === 'true') return true

  if (/^\d+$/.test(str)) return parseInt(str)

  return str
}
