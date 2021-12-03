// var name = 'window'

// var person1 = {
//   name: 'person1',
//   foo1: function () {
//     console.log(this.name)
//   },
//   foo2: () => console.log(this.name),
//   foo3: function () {
//     return function () {
//       console.log(this.name)
//     }
//   },
//   foo4: function () {
//     return () => {
//       console.log(this.name)
//     }
//   }
// }

// var person2 = { name: 'person2' }

// person1.foo1(); // person1(隐式绑定)
// person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)
//  person1.foo2(); // window(不绑定作用域,上层作用域是全局, 对象没有作用域)
// // person1.foo2.call(person2); // window

// // person1.foo3()(); // window(独立函数调用)
// // person1.foo3.call(person2)(); // window(独立函数调用)
// // person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

// // person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1)
// // person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
// // person1.foo4().call(person2); // person1(上层找到person1)

// 面试题2

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

