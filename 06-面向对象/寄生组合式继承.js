function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.eating = function () {
  console.log(this.name, ':eat')
}

function Student(sno) {
  Person.call(this, 'gt', 18) // 利用.call直接在实例上添加共有属性
  this.sno = sno
}

function createPrototype(proto) {
  const Fn = new Function()
  Fn.prototype = proto
  return new Fn()
  // return Fn.prototype
}
// 方法一: es6方法直接获取一个对象的隐式原型
// console.log(Person.prototype)
// console.log(Object.create(Person.prototype).__proto__)
// Student.prototype = Object.create(Person.prototype)
// console.log(Student.prototype === Person.prototype)
// Student.prototype.constructor = Student
// 方法二: 封装函数
Student.prototype = createPrototype(Person.prototype)
Student.prototype.constructor = Student

// 方法三: 封装es6函数
// function extendsFn(subClass, superClass) {
//   subClass.prototype = Object.create(superClass.prototype);
//   Object.defineProperty(subClass.prototype, "constructor", {
//     configurabel: true,
//     enumerable: false,
//     writable: true,
//   })
// }
// extendsFn(Student, Person);

Student.prototype.study = function () {
  console.log(this.name, ':study')
}

const s1 = new Student(123)
console.log(s1)
console.log(s1.__proto__)
s1.study()
s1.eating()
