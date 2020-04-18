// 创建vdom,正常html标签是对象，文本节点是字符串
function createVdom(tag, attrs, children) {
  return {
    tag,
    attrs,
    children
  }
}

// vdom 转为真实 dom
function vdom2Element(vdom) {
  if (typeof vdom === 'string') {
    return document.createTextNode(vdom)
  }
  var dom = document.createElement(vdom.tag);
  setAttributes(dom, vdom.attrs)
  vdom.children.forEach(child => dom.appendChild(vdom2Element(child)))
  return dom
}

function setAttributes(dom, attrs) {
  if (dom.nodeType === 3) { // 文本节点直接返回
    return
  }
  Object.keys(attrs).forEach(key => {
    var value = attrs[key]
    // 事件
    if (/^on[A-Z]+/.test(key)) {
      dom.addEventListener(key.slice(2).toLowerCase(), value, false)
    } else if (key === 'class') {
      // 类名
      dom.removeAttribute('class')
      value && dom.classList.add(value)
    } else if (key === 'style') {
      // 样式
      dom.style.cssText = value
    } else {
      // 通用
      dom.setAttribute(key, value)
    }
  })
}

function mount(dom, container) {
  container.appendChild(dom)
}