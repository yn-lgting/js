class Person{
  eat() {
    console.log('eat')
  }
}

class Student extends Person {

}

function minxinClass(superClass) {
  // 创建一个新的类， 继承至需要混入的类
  return class extends superClass {
    run() {
      console.log('run')
    }
  }
}

const NewClass = minxinClass(Student)

const newC = new  NewClass()
newC.eat()


