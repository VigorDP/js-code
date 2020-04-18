function patch(el, patches) {
  var obj = {
    index: 0
  }
  traverse(el, obj, patches)
}

function traverse(el, obj, patches) {
  var children = el.childNodes
  if (children.length === 0) {
    doPatch(el, obj, patches)
  } else {
    children.forEach(child => {
      traverse(child, obj, patches)
    })
    doPatch(el, obj, patches)
  }
}

function doPatch(el, obj, patches) {
  var patch = patches[obj.index]
  patch.forEach(item => {
    if (item.type === 'REMOVE') {
      el.parentNode.removeChild(el)
    } else if (item.type === 'REPLACE') {
      const newDom = vdom2Element(item.value)
      el.parentNode.replaceChild(newDom, el)
    } else {
      setAttributes(el, item.value)
    }
  })
  obj.index++
}