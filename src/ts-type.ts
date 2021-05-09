export type AnyFn = (...a: any[]) => any
/**
 * 把类型T的Key为K的属性设置为必须
 */
export type RequiredProps<T, K extends keyof T> = {
  [p in K]-?: T[p]
} &
  T
