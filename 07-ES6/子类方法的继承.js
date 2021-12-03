class Person{
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  static parentMethod() {
    console.log('parent Method')
  }
  run() {
    console.log(this.name, 'run1')
  }
}

class Student extends Person {
  constructor(sno) {
    super(...arguments)
    this.sno = sno
  }
  run() { // 子类重写父类方法
    super.run() // 子类可以通过super关键字调用父类原型上的方法
    console.log('student', this.name, 'run2')
  }
  static parentMethod() { // 也可以修改其父类的静态方法【只能由其本身或子类本身调用】
    super.parentMethod() // 可以通过super关键字调用父类方法
    console.log('update parent method')
  }
}

const s1 = new Student('gt', 18, 1001)
console.log(s1)
s1.run()
Student.parentMethod()
console.log(Person.provate)



