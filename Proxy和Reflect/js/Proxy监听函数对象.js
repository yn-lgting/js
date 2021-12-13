/**
 * 函数也是一个对象，Proxy提供了 apply， constructor捕获器
 * apply 函数被调用时的捕获器
 * constructor 函数被new调用时的捕获器
 *  */ 

function foo() {
  console.log('foo被调用')
}

const proxyFoo = new Proxy(foo, {
  apply: function(target, thisArg, args) { // target 函数对象， thisArg 函数中的this， args 函数的参数
    console.log('监听到函数被调用')
    console.log(target, thisArg, args)
    return target.apply(thisArg, thisArg, args)
  },
  construct: function(target, args, newTarget) { // target 函数对象， args 函数的参数， newTarget 代理函数对象
    console.log('监听到函数被new关键字调用')
    console.log(target, args, newTarget)
    return new target(...args)
  }
})

// proxyFoo.apply({name: 'gt'}, [1, 2, 3])
// new proxyFoo(1, 2)
proxyFoo()