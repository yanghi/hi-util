/**
 * 返回一个函数,每次调用时会重新计时直到时间到达后运行
 * @param fn 需要调用的函数
 * @param time 需要延时的时间 ms
 * @returns
 */
export const whileDelayRun = (fn: () => any, time: number) => {
  var t
  const cancel = () => {
    if (t) {
      clearTimeout(t)
    }
    var cleared = t !== undefined
    t = undefined
    return cleared
  }
  const run = () => {
    cancel()
    t = setTimeout(() => {
      fn()
    }, time)
  }
  run.cancel = cancel
  return run
}
