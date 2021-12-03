
function Person() {
  this.name = 'gt';
  this.arr = []
}

Person.prototype.eating = function() {
  console.log(this.name, 'eat')
}

function Student(sno) {
  this.sno = sno
}

Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.study = function() {
  console.log(this.name, 'study')
}

const s1 = new Student(123);
const s2 = new Student(321);
console.log(s1.sno)
console.log(s1.name)
s1.eating()
s1.study()
console.log(s1)
console.log(s1.__proto__)
console.log(s1.__proto__.__proto__)

// 这里相当于给s1自身添加了name属性, 不会修改原型上的name, 所以s2的name不会受影响
// 子类实例的隐式原型指向了父类, 造成继承链紊乱
// 无法向父类传递参数
s1.name = 'yy'
s1.arr.push('dddd')
console.log(s1.name, s1.arr)
console.log(s2.name, s2.arr)