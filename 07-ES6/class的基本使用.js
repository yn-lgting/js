class Person {

}

const p1 = new Person()

console.log(Person.prototype.__proto__ === Object.prototype) // 类的prototype依旧是Object的实例
console.log(Person.prototype.constructor) // 类的prototype中依旧有constructor属性， 其指向类本身
console.log(Person.__proto__ === Function.prototype) // 类本身跟构造函数一样， 是有__proto__的， 且只想Function.prototype，可以说其是Function的一个实例

console.log(p1.__proto__ === Person.prototype) // true

console.log(Object.getOwnPropertyDescriptors(Person.prototype.constructor))