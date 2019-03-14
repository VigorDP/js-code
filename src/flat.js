// 递归法
function flat (arr) {
  const result = [] // 利用闭包缓存我们的结果
  function _flat (arr) {
    arr.forEach(element => {
      if (Array.isArray(element)) { // 递归条件
        _flat(element)
      } else { // 基准条件
        result.push(element) // 将符合结果的值推入我们的结果数组中
      }
    })
  }
  _flat(arr)
  return result
}
// 广度优先,不能保证顺序
function flat2 (arr) {
  const result = [] // 储存结果
  const list = [] // 队列
  function _forEach (arr) {
    arr.forEach(el => {
      if (Array.isArray(el)) list.push(el) // item 如果是数组，将子项依次推入队列
      else result.push(el) // item 如果是字符串，将子项推入结果
    })
  }
  _forEach(arr) // 初始化
  while (list.length > 0) { // 当 list 长度为0时候，遍历完成
    const item = list.shift()
    _forEach(item)
  }
  return result
}

// 取巧,你得确定你的数据里面没有字符串 ','
function flat3 (arr) {
  return arr.toString().split(',').map(value => +value)
}

console.log('object', flat([1, [2, 3, [4, 5], 6], 7]))
