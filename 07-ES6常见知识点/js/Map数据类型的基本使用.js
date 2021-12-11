const obj = { name: 'gt'}
const obj1 = { name: 'gt1'}
const obj2 = { name: 'gt2'}

// 创建map
const map = new Map()

// 添加属性 map.set(key, value)
map.set(obj, '111')
map.set(obj1, '222')
map.set(obj2, '333')
console.log(map)

// 获取属性 map.get(key)
console.log(map.get(obj))

// 是否包含某个属性 返回boolean
console.log(map.has(obj))

// 删除属性 map.delete(key) 返回boolean
map.delete(obj)
console.log(map)

// 清空属性 map.clear()

// 遍历map
map.forEach((item, key) => {
  console.log(item, key)
})

for(const item of map) {
  console.log(item) // 打印出来类类似于 [key, value]
}

// 直接数组结构 key value
for(const [key, value ] of map) {
  console.log(key, value)
}
