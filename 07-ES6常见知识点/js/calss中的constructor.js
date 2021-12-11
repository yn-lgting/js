class Person {
  // 类通过constructor来定义属性
  constructor(name, age) {
    this.name = name
    this.age = age
    this._address = '北京市'
  }
  // 共享方法直接定义在类中
  run() {
    console.log(this.name, 'run')
  }
  eat() {
    console.log(this.name, 'eat')
  }
  // 设置get set方法
  get address() {
    return this._address
  }
  set address(address) {
    this._address = address
  }
  // 定义类本身的方法， 只能通过类调用
  static provate() {
    console.log('私有方法')
    const name = ['gt', 'am']
    const randomName = name[Math.floor(Math.random() * name.length)]
    const randomAge = Math.floor(Math.random() * 100)
    return new Person(randomName, randomAge)
  }
}

const p1 = new Person('gt', 18)
console.log(p1)
console.log(p1.address)
p1.run()
const p2 = Person.provate()
console.log(p2)