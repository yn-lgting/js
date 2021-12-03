var name = 'window'

function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

// 注意: 被new关键子创建出来的对象方法的上层作用域是其构造函数

person1.foo1() // person1
person1.foo1.call(person2) // person2(显示高于隐式绑定)

person1.foo2() // person1 (上层作用域中的this是person1), 此时他的上层作用域是Person构造函数, 又被person1调用, 又因为foo2是箭头函数, 所以此时打印的是person1
person1.foo2.call(person2) // person1 (上层作用域中的this是person1)此时他的上层作用域是Person函数, 又因为foo2是箭头函数, 所以call影响不了其this, 所以打印person1

person1.foo3()() // window(独立函数调用)
person1.foo3.call(person2)() // window
person1.foo3().call(person2) // person2

person1.foo4()() // person1
person1.foo4.call(person2)() // person2
person1.foo4().call(person2) // person1


var obj = {
  name: "obj",
  foo: function() {

  }
}


