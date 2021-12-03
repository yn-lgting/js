const arr = [1, 2, 3, 4, 5]

/** 
 * 1. slice 在传入确定的数组时, 会产生确定的输出
 * 2. 它不会修改原来的数组
 * 3. 符合纯函数条件
 */

// let newArr = arr.slice(0, 3)
// console.log(newArr)// 1, 2, 3
// console.log(arr)// [1, 2, 3, 4, 5]

/**
 * splice在传入确定的数组时虽然返回确定的值
 * 当时会修改原来的数组, 所以不是纯函数
 */
let newArr1 = arr.splice(0, 3)
console.log(newArr1) // [1, 2, 3]
console.log(arr) // [4, 5]


