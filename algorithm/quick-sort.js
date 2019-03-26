// version 1
function quickSort(array) {
  if (array.length === 1) return array;
  let baseIndex = array.length / 2;
  let baseValue = array.splice(baseIndex, 1)[0];
  const left = [],
    right = [];
  array.forEach(element => {
    if (element < baseValue) {
      left.push(element);
    } else {
      right.push(element);
    }
  });
  return quickSort(left).concat([baseValue], quickSort(right));
}

console.log(quickSort([1, 4, 7, 4, 9, 7, 10]));

// version 2
function quickSort2(array) {
  function swap(array, p1, p2) {
    const temp = array[p1];
    array[p1] = array[p2];
    array[p2] = temp;
  }
  function sort(array, left, right) {
    if (left >= right) return;
    const index = partion(array, left, right);
    sort(array, left, index - 1);
    sort(array, index + 1, right);
  }
  function partion(array, left, right) {
    let index = left;
    const middleElement = array[right];
    for (let i = left; i < right; i++) {
      if (array[i] < middleElement) {
        swap(array, i, index);
        index++;
      }
    }
    swap(array, index, right);
    return index;
  }
  sort(array, 0, array.length - 1);
  return array;
}
console.log(quickSort2([1, 4, 7, 4, 9, 7, 10]));
