const obj = {
  info: 'obj'
}
const proto = {
  name: 'gt'
}

// 1. 设置对象隐式原型
Object.setPrototypeOf(obj, proto)

// 2. 获取对象隐式原型
// console.log(Object.getPrototypeOf(obj))

// 3. 设置对象不可扩展 Object.preventExtensions 让一个对象不可扩展（其隐式原型也不可变），并返回该对象 
const newObj = Object.preventExtensions(obj)
try {
  Object.defineProperty(obj, 'age', { // 直接报错 Cannot define property age, object is not extensible
    value: 18
  })
} catch (e) {
  console.log(e)
}
obj.height = 1.88
console.log(obj) // 直接添加属性则是静默错误，属性是添加不上去的d
console.log(newObj)
console.log(obj === newObj) // true

// 4. 检查对象是否可扩展
const isExtend = {}
console.log(Object.isExtensible(isExtend)) // true
Object.preventExtensions(isExtend)
console.log(Object.isExtensible(isExtend)) // false

