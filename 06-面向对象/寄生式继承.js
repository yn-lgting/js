function Person(name, age){
  this.name = name 
  this.age = age
}
Person.prototype.eating = function() {
  console.log(this.name, ':在吃')
}
function Stutend(sno) {
  Person.call(this, 'gt', 18)
  this.sno = sno
}

function extendFn(subClass, superCalss) {
  subClass.prototype = Object.create(superCalss.prototype)
  // 此时子类的显示原型指向的是父类的显示原型，其中的constructor构造器指向的是父类，需要手动指挥
  Object.defineProperty(subClass.prototype, 'constructor', {
    configurable: true,
    writable: true,
    value: Stutend
  })
}

extendFn(Stutend, Person)

const s1 = new Stutend(123)
console.log(s1)
s1.eating()