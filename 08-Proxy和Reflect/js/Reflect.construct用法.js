function Person(name, age) {
  this.name = name
  this.age = age
}

function Student() {

}

/**
 * Reflect.construct(target, args, newTarget) // 类似于new操作符
 * target：被运行的构造函数
 * args：类数组，目标构造函数调用时的参数
 * newTarget：作为新对象的原型对象的constructor属性
 */
// 通过new Person 创建一个实例， 且有name age属性， 且是Student类型

const stu = Reflect.construct(Person, ['gt', 21], Student)
// console.log(Object.getOwnPropertyDescriptor(Student.prototype, 'constructor'))
console.log(stu) // Student { name: 'gt', age: 21 }
console.log(Object.getPrototypeOf(stu) === Student.prototype) // true
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(stu))) // [constructor]
console.log(Object.getPrototypeOf(stu).constructor === Student) // true