// 工具函数
function checkArray (array) {
  return Array.isArray(array)
}
function swap (array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

/**
 * 基本排序算法(升序)
*/

// 1、冒泡 O(n*n) 原理：两两比较
function bubble (array) {
  if (!checkArray(array)) {
    return
  }
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) { // 注意越界
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}
// console.log(bubble([4, 1, 5, 9, 10, 2, 0]))

// 2、选择排序 O(n*n) 原理：擂台机制，假定一个最小值
function select (array) {
  if (!checkArray(array)) {
    return
  }
  for (let i = 0; i < array.length; i++) {
    let min = array[i]
    for (let j = i + 1; j < array.length; j++) {
      if (min > array[j]) {
        min = array[j]
        swap(array, i, j)
      }
    }
  }
  return array
}
// console.log(select([4, 1, 5, 9, 10, 2, 0]))

// 3、插入排序 O(n*n) 原理：假定一个长度为1的数组A已排序，把数组其他元素插入到A中，插入过程中保证A还是有序的
function insert (array) {
  if (!checkArray(array)) {
    return
  }
  for (let i = 1; i <= array.length; i++) { // 控制已排序数组的长度
    for (let j = i - 1; j > 0; j--) { // 拿一个新元素，插入到原已排序数组
      if (array[j] < array[j - 1]) {
        swap(array, j - 1, j)
      }
    }
  }
  return array
}
console.log(insert([4, 1, 5, 9, 10, 2, 0]))

// 4、归并排序 时间：O(N*logN)，空间O(N)
function merge (array) {
  if (!checkArray(array)) return
  mergeSort(array, 0, array.length - 1)
  return array
}
function mergeSort (array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1))
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)

  let help = []
  let i = 0
  let p1 = left
  let p2 = mid + 1
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++]
  }
  while (p1 <= mid) {
    help[i++] = array[p1++]
  }
  while (p2 <= right) {
    help[i++] = array[p2++]
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i]
  }
  return array
}

// 5、快速排序
// version 1 时间：O(N*logN) 空间：O(N)
function quickSort (array) {
  if (array.length === 1) return array
  let baseIndex = array.length / 2
  let baseValue = array.splice(baseIndex, 1)[0]
  const left = []
  const right = []
  array.forEach(element => {
    if (element < baseValue) {
      left.push(element)
    } else {
      right.push(element)
    }
  })
  return quickSort(left).concat([baseValue], quickSort(right))
}

console.log(quickSort([1, 4, 7, 4, 9, 7, 10]))

// version 2 时间：O(N*logN) 空间：O(1)
function quickSort2 (array) {
  function sort (array, left, right) {
    if (left >= right) return
    const index = partion(array, left, right)
    sort(array, left, index - 1)
    sort(array, index + 1, right)
  }
  function partion (array, left, right) {
    let index = left
    const middleElement = array[right]
    for (let i = left; i < right; i++) {
      if (array[i] < middleElement) {
        swap(array, i, index)
        index++
      }
    }
    swap(array, index, right)
    return index
  }
  sort(array, 0, array.length - 1)
  return array
}
console.log(quickSort2([1, 4, 7, 4, 9, 7, 10]))

// 6、堆排序
function heap (array) {
  if (!checkArray(array)) return
  // 将最大值交换到首位
  for (let i = 0; i < array.length; i++) {
    heapInsert(array, i)
  }
  let size = array.length
  // 交换首位和末尾
  swap(array, 0, --size)
  while (size > 0) {
    heapify(array, 0, size)
    swap(array, 0, --size)
  }
  return array
}

function heapInsert (array, index) {
  // 如果当前节点比父节点大，就交换
  while (array[index] > array[parseInt((index - 1) / 2)]) {
    swap(array, index, parseInt((index - 1) / 2))
    // 将索引变成父节点
    index = parseInt((index - 1) / 2)
  }
}
function heapify (array, index, size) {
  let left = index * 2 + 1
  while (left < size) {
    // 判断左右节点大小
    let largest =
      left + 1 < size && array[left] < array[left + 1] ? left + 1 : left
    // 判断子节点和父节点大小
    largest = array[index] < array[largest] ? largest : index
    if (largest === index) break
    swap(array, index, largest)
    index = largest
    left = index * 2 + 1
  }
}
