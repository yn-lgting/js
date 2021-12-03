// 创建一个对象并指定其隐式原型指向的对象
const obj = {
  name: 'gt'
}

const info = Object.create(obj, {
  age: {
    value: 18,
    enumerable: true,
  }
})
console.log(info.hasOwnProperty('name')) // false
console.log(info.__proto__) // {name: 'gt}
console.log(info)
console.log('name' in info)
// Object.hasOwnProperty检查对象本身是否包含某个属性
console.log(info.hasOwnProperty('age')) // true
console.log(info.hasOwnProperty('name')); // false

// instanceof 检查某个函数prototype是否存在于某个对象的原项链上
function Student() {}
const a = {
  info: 'info'
}
console.log(a instanceof Student)
console.log(a instanceof Object)

// 对象.isPrototypeOf 检查某个对象是否出现在其原型链中
console.log(a.isPrototypeOf(Student.prototype)) 
console.log(a.isPrototypeOf(Object.prototype))
console.log(Object.prototype.isPrototypeOf(a))