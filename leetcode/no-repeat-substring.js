/**
 *
 * @param {string} string
 * @returns {number}
 */
function getNoRepeatSubString(string) {
  const map = {}
  let head = 0
  return string.split('').reduce((max, tail, index) => {
    head = map[tail] >= head ? map[tail] + 1 : head
    console.log(head)
    map[tail] = index
    return Math.max(max, index - head + 1)
  }, 0)
}

console.log(getNoRepeatSubString('pwwkew'))