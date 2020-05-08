function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const base = arr[0];
  const left = [],
    right = [];
  arr.forEach((item, key) => {
    if (key !== 0) {
      if (item <= base) {
        left.push(item);
      } else {
        right.push(item);
      }
    }
  });
  return quickSort(left)
    .concat([base])
    .concat(quickSort(right));
}

// console.log(quickSort([1, 4, 3, 7, 2, 8, 1]));