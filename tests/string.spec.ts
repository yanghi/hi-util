import { fillStr, strEllipsis, strValue } from '@/string'

describe('string utils', () => {
  it('strValue', () => {
    expect(strValue('1')).toBe(1)
    expect(strValue('0.1')).toBe(0.1)
    expect(strValue('1.2.1')).toBe('1.2.1')
    expect(strValue('1g')).toBe('1g')
    expect(strValue('true')).toBe(true)
    expect(strValue('false')).toBe(false)
  })
  it('strValue', () => {
    const full = '0000000000'
    expect(strEllipsis(full, 5)).toBe('00...')
    expect(strEllipsis(full, 5, 'xx')).toBe('000xx')
  })
  it('fillStr', () => {
    expect(fillStr('x', '00', 5)).toBe('0000')
    expect(fillStr('x', '00', 5, false)).toBe('x0000')
    expect(fillStr('x', '00', 5, true)).toBe('0000x')
    expect(fillStr('x', '0', 5, true)).toBe('0000x')
  })
})
