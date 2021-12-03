// 原型链继承的缺点
/**
 * 1. 无法传递参数
 * 2. 修改引用类型的公用属性, 会影响到其他实例
 */
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.eating = function () {
  console.log(this.name, 'eat');
}

const p1 = new Person();

function Student(name, age, sno) {
  Person.call(this, name, age) // 这里的this 是Student的实例对象, 此时就继承了父类的属性
  this.sno = sno;
}
Student.prototype = p1 // 继承父类的方法, 此时子类的实例找不到方法时, 回去p1上找, 再找不到就去p1的显示原型Person.prototype上面去找, 这样就实现了方法的继承
Student.prototype.runing = function() {
  console.log(this.name, 'run')
}

const s1 = new Student('gt', 18, '111')
console.log(s1)
s1.eating()
s1.runing()