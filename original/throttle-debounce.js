function throttle(fn, time, immediate) {
  let startTime = Date.now();
  let needRunRightNow = immediate;
  return function() {
    const args = Array.from(arguments);
    const currentTime = Date.now();
    if (needRunRightNow) {
      fn.apply(null, args);
      needRunRightNow = false;
      return;
    }
    if (currentTime - startTime > time) {
      fn.apply(null, args);
      startTime = currentTime;
    }
  };
}

function debounce(fn, time, immediate) {
  let startTime = Date.now();
  let needRunRightNow = immediate;
  return function() {
    const args = Array.from(arguments);
    const currentTime = Date.now();
    if (needRunRightNow) {
      fn.apply(null, args);
      needRunRightNow = false;
      return;
    }
    if (currentTime - startTime > time) {
      // 缺陷：最後一次触发不会执行
      fn.apply(null, args);
    }
    startTime = currentTime;
  };
}

function debounce2(fn, time, immediate) {
  // 不存在最后一次触发不执行的问题
  let timer = null;
  let needRunRightNow = immediate;
  return function() {
    const args = Array.from(arguments);
    if (needRunRightNow) {
      fn.apply(null, args);
      needRunRightNow = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, args);
      timer = null;
    }, time);
  };
}
