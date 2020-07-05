function memoize(fn) {
  let lastArg;
  let lastResult;
  function cacheFn() {
    if (!lastArg) {
      lastArg = Array.from(arguments);
      lastResult = fn.apply(null, lastArg);
      return lastResult;
    }
    if (!isArgumentChanged(lastArg, Array.from(arguments))) {
      return lastResult;
    }
    lastArg = Array.from(arguments);
    lastResult = fn.apply(null, lastArg);
    return lastResult;
  }
  function reset() {
    lastArg = undefined;
    lastResult = undefined;
  }
  return Object.assign(cacheFn, {
    reset
  });
}

function isArgumentChanged(old, fresh) {
  return old.every((value, index) => value === fresh[index]);
}
