/**
 * 双指针发，i指定开始，j指定结尾
 * @param {*} string
 * @returns array
 */
function getAllSubString (string) {
  var len = string.length
  var result = []
  for (var i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      const element = string.substring(i, j)
      result.push(element)
    }
  }
  return result
}

console.log(getAllSubString('abcde'))
