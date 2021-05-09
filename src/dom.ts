import { trim } from './common'

export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export function createElement(tag: keyof HTMLElementTagNameMap, container?: Element, classname?: string) {
  let el = document.createElement(tag)
  if (container) {
    container.appendChild(el)
  }
  if (classname) {
    el.className = classname
  }
  return el
}
export function removeElement(el: Element | string) {
  if (typeof el == 'string') {
    el = document.querySelector(el)
  }
  let parent = el.parentElement
  parent && parent.removeChild(el)
}
