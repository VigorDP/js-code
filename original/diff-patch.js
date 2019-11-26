// 1、准备工作
// 虚拟dom元素的类，构建实例对象，用来描述dom
function Element(type, props, children) {
  this.type = type;
  this.props = props;
  this.children = children;
}
// 设置属性
function setAttr(node, key, value) {
  switch (key) {
    // node是一个input或者textarea
    case 'value':
      if (node.tagName.toUpperCase() === 'INPUT' ||
        node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

// 返回虚拟节点 object
function createElement(type, props, children) {
  return new Element(type, props, children);
}

// render方法可以将vNode转化成真实dom
function render(eleObj) {
  let el = document.createElement(eleObj.type);

  for (let key in eleObj.props) {
    // 设置属性的方法
    setAttr(el, key, eleObj.props[key]);
  }
  // 遍历儿子
  // 如果是虚拟dom继续渲染
  // 不是就代表是文本节点
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  });

  return el;
}
// 将元素插入到页面内
function renderDom(el, target) {
  target.appendChild(el);
}

// 2、diff 算法
function diff(oldTree, newTree) {
  let patches = {};
  // 第一次比较应该是树的第0个索引
  let index = 0;
  // 递归树 比较后的结果放到补丁里
  walk(oldTree, newTree, index, patches);
  return patches;
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // 判断老的属性中和新的属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 有可能还是undefined
    }
  }

  for (let key in newAttrs) {
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}

function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++num, patches);
  });
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
// 所有都基于一个序号来实现
let num = 0;

function walk(oldNode, newNode, index, patches) {
  // 每个元素都有一个补丁
  let current = [];

  if (!newNode) {
    current.push({
      type: REMOVE,
      index
    });
  } else if (isString(oldNode) && isString(newNode)) {
    // 判断文本是否一致
    if (oldNode !== newNode) {
      current.push({
        type: TEXT,
        text: newNode
      });
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性是否有更改
    let attrs = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      current.push({
        type: ATTRS,
        attrs
      });
    }
    // 如果有子节点，遍历子节点
    diffChildren(oldNode.children, newNode.children, patches);
  } else { // 说明节点被替换了
    current.push({
      type: REPLACE,
      newNode
    });
  }
  if (!oldNode) {
    current.push({
      type: REPLACE,
      newNode
    });
  }

  // 当前元素确实有补丁
  if (current.length) {
    // 将元素和补丁对应起来，放到大补丁包中
    patches[index] = current;
  }

}

// 3、patch 算法
let allPatches;
let index = 0; // 默认哪个需要打补丁

function patch(node, patches) {
  allPatches = patches;

  walk2(node);
  // 给某个元素打补丁
}

function walk2(node) {
  let current = allPatches[index++];
  let childNodes = node.childNodes;

  // 深度先序
  childNodes.forEach(child => walk(child));

  if (current) {
    doPatch(node, current);
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'ATTRS':
        for (let key in patch.attrs) {
          let value = patch.attrs[key];
          if (value) {
            setAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case 'TEXT':
        node.textContent = patch.text;
        break;
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
      default:
        break;
    }
  });
}
// 4、测试代码
let virtualDom = createElement('ul', {
  class: 'list'
}, [
  createElement('li', {
    class: 'item'
  }, ['a']),
  createElement('li', {
    class: 'item'
  }, ['b']),
  createElement('li', {
    class: 'item'
  }, ['c'])
]);

let virtualDom2 = createElement('ul', {
  class: 'list-group'
}, [
  createElement('li', {
    class: 'item'
  }, ['1']),
  createElement('li', {
    class: 'item'
  }, ['b']),
  createElement('p', {
    class: 'page'
  }, [
    createElement('a', {
      class: 'link',
      href: 'https://www.so.com/',
      target: '_blank'
    }, ['so'])
  ]),
  createElement('li', {
    class: 'wkk'
  }, ['wkk'])
]);
// 将虚拟dom转化成了真实dom并渲染到页面
let el = render(virtualDom);
renderDom(el, window.root);

let patches = diff(virtualDom, virtualDom2);
console.log(patches);

// 给元素打补丁，重新更新视图
patch(el, patches);