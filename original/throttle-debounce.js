function throttle (fn, time, immediate) {
  let startTime = Date.now()
  let needRunRightNow = immediate
  return function () {
    const args = Array.from(arguments)
    const currentTime = Date.now()
    if (needRunRightNow) {
      fn.apply(null, args)
      needRunRightNow = false
      return
    }
    if (currentTime - startTime > time) {
      fn.apply(null, args)
      startTime = currentTime
    }
  }
}

function debounce (fn, time, immediate) {
  let startTime = Date.now()
  let needRunRightNow = immediate
  return function () {
    const args = Array.from(arguments)
    const currentTime = Date.now()
    if (needRunRightNow) {
      fn.apply(null, args)
      needRunRightNow = false
      return
    }
    if (currentTime - startTime > time) {
      fn.apply(null, args)
    }
    startTime = currentTime
  }
}
