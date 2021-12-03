// // 隐式高于默认
// function foo() {
//   console.log(this)
// }

// let obj = {
//   foo,
//   bar: foo.bind('123')
// }

// foo() // window
// obj.foo() // obj

// // 显示高于隐式绑定
// obj.foo.call('abc') // abc
// // bind优先级高于隐式绑定
// // bind不立即执行函数，而是返回一个新的函数
// obj.bar() // 123

// // new 绑定高于显示绑定
// function fun () {
//   console.log(this)
// }
// const a = fun.bind('123')
// // a()
// const b = new a() // fun

// 代码测试
// function fooa(args) {
//   console.log(this)
//   console.log(args)
// }
// function newBind(Fn, args) {
//   console.log(args)
//   args.unshift(null);
//   console.log(args)
//   return new ((Fn.bind).apply(Fn, [...args]))
// }

// let v = newBind(fooa, [1, 2, 3])
// console.log(v)


// // function bar1(p1, p2) {
// //   console.log(p1, p2)
// // }
// // bar1.apply('123', [2,3])

// function foob() {
//   console.log(this)
// }

// const obja = {
//   foob,
// }

// obja.foob.call('123')

// 特殊语法调用
// let o = {
//   foo() {
//     console.log(this)
//   }
// }

// let p = {}; // 这里需要加分号, 否则词法解析时会报错

// (p.foo = o.foo)()

// 箭头函数this
let foo = () =>{
  console.log(this)
}
let obj = {
  foo
}
foo() // window
obj.foo()// window
foo.call('abc')// window