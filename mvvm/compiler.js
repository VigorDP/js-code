function Compiler(vm, el) {
  var dom = document.querySelector(el);
  this.vm = vm;
  this.$el = dom;
  this.init();
}

Compiler.prototype = {
  constructor: Compiler,
  init: function () {
    var childNodes = this.$el.childNodes;
    [].slice.call(childNodes).forEach(child => this.compile(child));
  },
  compile: function (child) {
    if (child.nodeType === 3) {
      var val = child.textContent;
      var reg = /\{\{(.*)\}\}/;
      var result = val.match(reg);
      if (!result) return;
      this.bind(val.match(reg)[1], "text", child);
    } else {
      var attrs = child.attributes;
      [].slice.call(attrs).forEach(attr => {
        var directiveReg = /v-/,
          eventDirectiveReg = /v-on/,
          attrName = attr.name,
          attrValue = attr.value;
        if (attrName.match(directiveReg)) {
          if (attrName.match(eventDirectiveReg)) {
            this.event(attrName.slice(5), attrValue, child);
          } else {
            this.bind(attrValue, attrName.slice(2), child);
          }
          child.removeAttribute(attrName);
        }
      });
      [].slice.call(child.childNodes).forEach(child => this.compile(child));
    }
  },
  bind: function (exp, type, node) {
    var me = this;
    if (type === "model") {
      node.addEventListener("input", function (e) {
        me.vm[exp] = e.target.value;
      });
    }
    var updateFn = updateUtil[type];
    updateFn && updateFn(node, this.vm[exp]);
    new Watcher(this.vm, exp, function () {
      updateFn && updateFn(node, this.vm[exp]);
    });
  },
  event: function (eventType, exp, node) {
    var handler = this.vm.options.methods[exp].bind(this.vm)
    node.addEventListener(eventType, handler, false);
  }
};

var updateUtil = {
  text: function (node, newValue) {
    node.textContent = newValue;
  },
  model: function (node, newValue) {
    node.value = newValue;
  }
};