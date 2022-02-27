import { rgb, rgba, hexToRGB } from '@/color'

describe('color utils', () => {
  it('rgba', () => {
    const rgbWhite = 'rgb(255,255,255)'
    const white_1 = 'rgba(255,255,255,0.1)'
    const white_2 = 'rgba(255,255,255,0.2)'

    expect(rgba(rgbWhite, 0.1)).toBe(white_1)
    expect(rgba('#ffffff', 0.1)).toBe(white_1)
    expect(rgba(hexToRGB('#ffffff'), 0.1)).toBe(white_1)
    expect(rgba(white_1, 0.2)).toBe(white_2)
    expect(rgba('#hh', 0.1)).toBeUndefined()
  })
  it('rgb', () => {
    const rgbWhite = 'rgb(255,255,255)'
    const white_1 = 'rgba(255,255,255,0.1)'

    expect(rgb(rgbWhite)).toBe(rgbWhite)
    expect(rgb('#ffffff')).toBe(rgbWhite)
    expect(rgb(hexToRGB('#ffffff'))).toBe(rgbWhite)
    expect(rgb(white_1)).toBe(rgbWhite)
    expect(rgb('#hh')).toBeUndefined()
  })
})
