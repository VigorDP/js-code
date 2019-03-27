// BST 若用作排序时间复杂度可达 O(N); 若用作查找时间复杂度可达O(logN),但不是严格的O(logN)，极端情况下会退化为链表
class Node {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor () {
    this.root = null
    this.size = 0
    this.array = []
  }
  addNode (value) {
    this.root = this._addChild(this.root, value)
  }
  _addChild (node, value) {
    if (!node) {
      this.size++
      return new Node(value)
    }
    if (node.value > value) {
      node.left = this._addChild(node.left, value)
    } else {
      node.right = this._addChild(node.right, value)
    }
    return node
  }
  // 先序递归遍历,深度遍历
  preTraversal () {
    this._pre(this.root)
  }
  _pre (node) {
    if (node) {
      console.log(node.value)
      this._pre(node.left)
      this._pre(node.right)
    }
  }
  // 中序递归遍历,深度遍历 结果就是排序
  midTraversal () {
    this._mid(this.root)
  }
  _mid (node) {
    if (node) {
      this._mid(node.left)
      console.log(node.value)
      this.array.push(node.value)
      this._mid(node.right)
    }
  }
  // 后序递归遍历,深度遍历
  backTraversal () {
    this._back(this.root)
  }
  _back (node) {
    if (node) {
      this._back(node.left)
      this._back(node.right)
      console.log(node.value)
    }
  }

  breadthTraversal () {
    if (!this.root) {
      return null
    }
    const q = []
    q.push(this.root)
    while (q.length) {
      const node = q.shift()
      console.log(node.value)
      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
    }
  }
}

var bst = new BST()
var array = [2, 5, 7, 1, 9, 3, 4]
array.forEach(value => bst.addNode(value))
bst.preTraversal()
// bst.midTraversal()
// console.log(bst.array)
// bst.backTraversal()

// bst.breadthTraversal()

// 非递归实现三种遍历
// 先序
function pre (node) {
  if (!node) {
    return
  }
  const stack = []
  stack.push(node)
  while (stack.length > 0) {
    let root = stack.pop()
    console.log(root.value)
    if (root.right) {
      stack.push(root.right)
    }
    if (root.left) {
      stack.push(root.left)
    }
  }
}
pre(bst.root)

// 中序
function mid (node) {
  if (!node) {
    return
  }
  const stack = []
  while (stack.length || node) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      console.log(node)
      node = node.right
    }
  }
}

// 后序
function after (node) {
  const stack1 = []
  const stack2 = []
  stack1.push(node)
  while (stack1.length > 0) {
    node = stack1.pop()
    stack2.push(node)
    if (node.left) {
      stack1.push(node.left)
    }
    if (node.right) {
      stack1.push(node.right)
    }
  }
  while (stack2.length) {
    node = stack2.pop()
    console.log(node.value)
  }
}
