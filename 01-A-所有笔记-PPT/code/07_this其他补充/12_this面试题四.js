var name = 'window'

function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      console.log(this.name);
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // window
// person1.obj.foo1.call(person2)() // window
// person1.obj.foo1().call(person2) // person2

// person1.obj.foo2()() // obj
// person1.obj.foo2.call(person2)() // person2, .call调用此时foo2的this指向person2, 然后箭头函数的this取决于上层作用域, 而上层作用域的this指向person2, 打印name即person2
// person1.obj.foo2().call(person2) // obj


// 

// 上层作用域的理解
// var obj = {
//   name: "obj",
//   foo: function() {
//     // 上层作用域是全局
//   }
// }

// function Student() {
//   this.foo = function() {

//   }
// }

