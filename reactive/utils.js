function isObj(obj) {
  return obj !== null && typeof obj === 'object'
}

const rawToReactive = new WeakMap()
const reactiveToRaw = new WeakMap()
const targetMap = new WeakMap()
const effectStack = []