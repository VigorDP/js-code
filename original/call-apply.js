Function.prototype.call = call

function call () {
  const args = Array.from(arguments) // 这里别用 slice.call 来转换类数组，会造成死循环
  const context = args[0]
  const arg = args.slice(1)
  if (typeof context !== 'object') {
    console.log('error')
    return
  }
  const fn = this
  if (context) {
    context.fn = fn
  }
  return context ? context.fn(...arg) : fn(...arg)
}

function test (...params) {
  console.log(this.a)
  console.log(params)
}
const obj4 = {
  a: 1
}
test.call(obj4)
test.call(null, 1, 2, 3)

Function.prototype.apply = apply
function apply () {
  const args = Array.from(arguments) // 这里别用 slice.apply 来转换类数组，会造成死循环
  const context = args[0]
  const arg = args[1]
  if (!Array.isArray(arg)) {
    console.log('error', arg)
    return
  }
  if (typeof context !== 'object') {
    console.log('error')
    return
  }
  const fn = this
  if (context) {
    context.fn = fn
  }
  return context ? context.fn(arg) : fn(arg)
}

// function test (params) {
//   console.log(params)
// }
// const obj = {
//   a: 1
// }
// test.apply(obj, 1)
// test.apply(null, [1, 2, 3])
