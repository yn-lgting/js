/**
 * 数据结构：存储数据的格式
 * es6之前只有数组和对象去存储数据
 * es6之后新增了Set数据结构， 跟数组类似，但是它里面不允许出现相同的元素
 * 可以调用Set构造函数传入一个可迭代对象，来创建一个set数据类型的值
 */

const initSet = new Set([1, 2, 3])
initSet.add(1)
// console.log(initSet)

// 利用Set数据类型给数组去重

const arr = [1, 2, 3, 3, 2, 1]
const newArr = [...new Set(arr)]
const newArr2 = Array.from(new Set(arr))
console.log(newArr2)

// 常用属性和方法
const initSet2 = new Set([1, 2, 3])
console.log(initSet2.keys)
console.log(initSet2.size) // 获取set长度

// 添加一个值
initSet2.add(4)
console.log(initSet2)

// 删除一个值， 需要指定要删除的值
initSet2.delete(1)
console.log(initSet2)

// 清空set
// initSet2.clear()
// console.log(initSet2)

// 检查set里是否包含某个值
console.log(initSet2.has(3))

// 遍历set forEach, for of
const obj = { name: 'obj'}
initSet2.forEach((item, index) => {
  console.log(obj)
  console.log(item)
}, obj)

for(const item of initSet2) {
  console.log(item)
}



