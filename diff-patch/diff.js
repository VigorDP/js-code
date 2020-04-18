/**
 * 总体采用先序深度优先遍历算法得出2棵树的差异
 */

// 对比新旧vdom
function diff(old, fresh) {
  var patches = {}
  var obj = {
    index: 0
  }
  walk(old, fresh, obj, patches)
  return patches
}

function walk(old, fresh, obj, patches) {
  var muteArray = []
  // 新节点不存在
  if (!fresh) {
    muteArray.push({
      type: 'REMOVE'
    })
  } else if (typeof fresh === 'string') {
    // 新节点是文本节点
    muteArray.push({
      type: "REPLACE",
      value: fresh
    })
  } else {
    // 新节点是 tag 节点
    if (typeof old === 'string') {
      // 老节点是文本节点
      muteArray.push({
        type: "REPLACE",
        value: fresh
      })
    } else {
      // 老节点是tag节点(这里简化处理，只考虑相同tag)
      // 比较属性
      var attrs = diffAttr(old.attrs, fresh.attrs)
      muteArray.push({
        type: 'ATTR',
        value: attrs
      })
      // 比较子节点
      old.children.forEach((child, key) => {
        walk(child, fresh.children[key], obj, patches)
        obj.index++;
      })
    }
  }
  // 记录当前节点的变化
  if (muteArray.length >= 1) {
    patches[obj.index] = muteArray
  }
}

function diffAttr(oldAttr, freshAttr) {
  var result = Object.create(null)
  // 覆盖老的
  for (const key in oldAttr) {
    if (oldAttr.hasOwnProperty(key)) {
      result[key] = freshAttr[key]
    }
  }
  // 获取新的
  for (const key in freshAttr) {
    if (!oldAttr.hasOwnProperty(key)) {
      result[key] = freshAttr[key]
    }
  }
  return result
}