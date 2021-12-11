const arr = [1, 2, 3]
// 取出所有值
const [item1, item2, item3] = arr
console.log(item1, item2, item3) // 1, 2, 3

// 取出后两个值, 直接利用逗号daiti
const [, itemx, itemz] = arr
console.log(itemx, itemz) // 2, 3

// 取出第一个值， 剩余作为一个新数组
const [itemm, ...newArr] = arr
console.log(itemm, newArr) // 1, [2, 3]

// 结构默认值
const [itemg = 0, itemh, itemj, itemk = 4] = arr
console.log(itemg, itemh, itemj, itemk) // 1,2,3,4