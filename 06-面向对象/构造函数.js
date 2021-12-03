// 因为Person是一个函数, 所以会多出一个显示原型prototype
function Person(name, age) {
  console.log(Person.prototype)
  this.name = name,
  this.age = age,
  this.run = function() {
    console.log('run')
  }
}

// 此时p1, p2的对象原型指向的是同一个对象 即foo函数的prototype属性
const p1 = new Person('gt', 18)
const p2 = new Person('ll', 18)
// console.log(Person.prototype.constructor.prototype.constructor.prototype)
// console.log(Object.getOwnPropertyDescriptors(Person)) // prototype属性中有一个属性时constructor属性指向构造函数本身
// Object.defineProperty(Person, 'constructor', {
//   enumerable: true,
//   value: this.constructor
// })
Person.prototype.userDefineProp = 'test'
console.log(p1.userDefineProp, p2.userDefineProp) // test
console.log(p1.__proto__ === p2.__proto__) // true

//在原本原型上面添加新的属性, 容易产生大量重复代码, 所以可以重写prototype
Person.prototype = {
  userDefine: 0,
  userDefine1: 1,
  userDefine2: 2,
}
// ECMA规定原型内部必须要有一个constructor[构造器], 指回构造函数本身
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false, // 不可枚举
  configurable: true,
  writable: true, // 是否可修改
  value: Person
})
const p3 = new Person('ll', 18)

console.log(p3.userDefine)
