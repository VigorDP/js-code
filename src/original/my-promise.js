const Pending = 'pending'
const Resolved = 'resolved'
const Rejected = 'rejected'

class Promise {
  static all (promiseArray) {
    if (!Array.isArray(promiseArray)) {
      throw new Error('promiseArray must be an array')
    }
    const result = []
    let length = promiseArray.length
    return new Promise((res, rej) => {
      promiseArray.map((promise, index) => promise.then(data => {
        result[index] = data
        length--
        !length && res(result)
      }).catch(err => rej(err)))
    }).catch(err => console.log(err))
  }
  static race (promiseArray) {
    if (!Array.isArray(promiseArray)) {
      throw new Error('promiseArray must be an array')
    }
    return new Promise((res, rej) => {
      promiseArray.map(promise => promise.then(data => {
        res(data)
      }).catch(err => rej(err)))
    }).catch(err => console.log(err))
  }
  constructor (fn) {
    this.state = Pending
    this.value = null
    this.successCallback = []
    this.failCallback = []
    this._resolve = this._resolve.bind(this)
    this._reject = this._reject.bind(this)
    try {
      fn(this._resolve, this._reject)
    } catch (error) {
      this._reject(error)
    }
  }
  _resolve (data) {
    if (this.state !== Resolved) { // 防止同一 promise 被 resolve 多次，如 race 的实现
      this.state = Resolved
      this.value = data
      setTimeout(() => {
        this.successCallback.forEach(fn => fn(data))
      }, 0)
    }
  }
  _reject (reason) {
    if (this.state !== Rejected) {
      this.state = Rejected
      this.value = reason
      setTimeout(() => {
        this.failCallback.forEach(fn => fn(reason))
      }, 0)
    }
  }
  then (success, fail) {
    const resolveFn = typeof success === 'function' ? success : arg => arg
    const rejectFn = typeof fail === 'function' ? fail : () => {}
    if (this.state === Pending) {
      this.successCallback.push(resolveFn)
      this.failCallback.push(rejectFn)
    }
    return this
  }
  catch (fn) {
    typeof fn === 'function' ? fn : err => console.log('catch err', err)
    return this.then(null, fn)
  }
}

// case 1
// const promise = new Promise((res, rej) => {
//   res('test')
// })

// promise.then(data => console.log(data)).then().then(data => console.log('second', data))

// case 2
// const promise = new Promise((res, rej) => {
//   re('error')
// })

// promise.then(data => console.log(data)).then().then(data => console.log('second', data)).catch(error => console.log(error))

// case 3
const promise = new Promise((res, rej) => {
  // rej('error')
  setTimeout(() => {
    res('ok')
  }, 1100)
})
const promise2 = new Promise((res, rej) => {
  setTimeout(() => {
    res('ok2')
  }, 1000)
})

Promise.all([promise, promise2]).then(data => console.log(data))

// case 4
// Promise.race([promise, promise2]).then(data => console.log(data))
