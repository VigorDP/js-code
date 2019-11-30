function MVVM(options) {
  this.options = options
  this.proxy(options.data)
  this.init(options)
}
MVVM.prototype = {
  constructor: MVVM,
  init: function (opt) {
    observe(opt.data)
    this.$compiler = new Compiler(this, opt.el)
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