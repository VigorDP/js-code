function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.val = this.get()
}

Watcher.prototype = {
  constructor: Watcher,
  get: function () {
    Dep.target = this;
    var val = this.vm[this.exp];
    Dep.target = null;
    return val
  },
  update: function (newValue) {
    this.cb(newValue)
  }
}