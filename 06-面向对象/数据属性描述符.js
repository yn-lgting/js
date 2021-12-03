let person = {
  name: 'gt',
  age: '18'
}
// 对对象属性进行限制
Object.defineProperty(person, 'address', {
  // 属性值： 默认undefined
  value: 'HeNan',
  // 是否可删除，是否可修改其描述符: 默认值false
  // 值为false时， 不可修改所有描述符
  configurable: false,
  // 是否可枚举[例：for in是否能遍历出来]： 默认值false
  enumerable: false,
  // 是否可修改： 默认值false
  writable: false
})

// 测试 Configurable
// delete person.address
// console.log(person.address)

// 测试 Enumerable
// console.log(Object.keys(person));

// 测试 writable
// Object.defineProperty(person, 'address', {
//   writable: true 报错
// })
person.address = 'XinYang'
console.log(person.address)
