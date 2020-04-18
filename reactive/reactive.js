const handlers = {
  get(target, name, receiver) { //如果name是一个 get 属性，则get函数的this会被绑定为receiver对象
    const result = Reflect.get(target, name, receiver)
    track(target, name);
    return isObj(result) ? reactive(result) : result
  },
  set(target, name, value, receiver) {
    const result = Reflect.set(target, name, value, receiver)
    trigger(target, name, value);
    return result
  }
}

function track(target, name) {
  let target2 = targetMap.get(target)
  if (!target2) {
    target2 = new Map()
    targetMap.set(target, target2)
  }
  let effectSet = target2.get(name)
  if (!effectSet) {
    effectSet = new Set()
    target2.set(name, effectSet)
  }
  // 等待 get 触发后，从 effectStack 取出 effect
  const fn = effectStack[effectStack.length - 1]
  fn && effectSet.add(fn)
}

function trigger(target, name, value) {
  const effectsMap = targetMap.get(target)
  const effects = effectsMap.get(name)
  effects.forEach(fn => fn(value))
}

function reactive(target) {
  const proxyObj = rawToReactive.get(target)
  if (proxyObj) {
    return proxyObj
  }
  // 如果 target 本身已经是 reactive 的
  if (reactiveToRaw.get(target)) {
    return target
  }
  const proxy = new Proxy(target, handlers)
  rawToReactive.set(target, proxy)
  reactiveToRaw.set(proxy, target)
  return proxy
}

function effect(fn) {
  effectStack.push(fn)
  const result = fn()
  effectStack.pop()
  return result
}

function computed(fn) {
  return {
    get value() {
      return effect(fn)
    }
  }
}