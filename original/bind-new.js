Function.prototype.bind = bind

function bind () {
  const args = Array.from(arguments)
  const context = args[0]
  const originalFn = this
  const arg_0 = args.slice(1)

  return function fn () {
    const arg_1 = Array.from(arguments)
    const arg = arg_0.concat(arg_1)
    if (this instanceof fn) {
      return new originalFn(...arg)
    } else {
      return originalFn.apply(context, arg)
    }
  }
}

function test (a) {
  if (a) {
    this.b = a
  }
  console.log(this.a)
  console.log(this.b)
}

// const b = test.bind({ a: 1 }, 2)
// b()
// new b('b')

function myNew () {
  const args = Array.from(arguments)
  const constructor = args[0]
  const arg = args.slice(1)
  if (typeof constructor !== 'function') {
    console.log('error')
    return
  }
  let obj = Object.create(constructor.prototype)
  constructor.apply(obj, arg)
  return obj
}

const ob = myNew(test, 3)
console.log(ob)
console.log(ob instanceof test)
