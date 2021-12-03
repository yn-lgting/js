class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    // 子类constructor中访问this之前需要先调用super关键字
    super(name, age)
    this.son = sno
  }
}

const s1 = new Student('gt', 19, 1001)
console.log(s1)