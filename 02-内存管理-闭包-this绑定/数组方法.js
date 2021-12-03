let nums = [1, 2, 3, 4, 5]
let num = nums.find((item) => {
  return item === 2
})

console.log(num) // 2

let Index = nums.findIndex(item => item === 5)
console.log(Index) // 4

/**
 * let sum = nums.reduce((上一次返回的值, 数组元素, 下标, 数组本身) => {
 *  return xxx
 * }, 初始值)
 */


let sum = nums.reduce((prev, item, index,arr) => {
  console.log(arr)
  return prev + item
}, 0)
console.log(sum) // 15


