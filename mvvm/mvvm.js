function MVVM(options) {
  this.options = options
  this.proxy(options.data)
  this.init(options)
}
MVVM.prototype = {
  constructor: MVVM,
  init: function (opt) {
    observe(opt.data)
    this.initComputed()
    this.initWatch()
    this.$compiler = new Compiler(this, opt.el)
  },
  initComputed() {
    var computed = this.options.computed
    Object.keys(computed).forEach(key => {
      var valueFn = computed[key].bind(this)
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get: function () {
          return valueFn()
        },
        set: function (newValue) {
          return newValue
        }
      })
    })
  },
  initWatch() {
    var watch = this.options.watch
    Object.keys(watch).forEach(key => {
      new Watcher(this, key, watch[key].bind(this))
    })
  },
  proxy: function (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get: function () {
          return data[key]
        },
        set: function (newValue) {
          return data[key] = newValue
        }
      })
    })
  }
}