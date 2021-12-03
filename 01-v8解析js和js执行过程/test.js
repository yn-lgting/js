var uname = 'lgt'
var num = 10
var num2 = 10
var result = num + num2

/**
 * js引擎在执行之前会创建, 会在堆内存中创建一个全局对象Global Object(GO)
 * 该对象所有的作用域(scope)都可以访问
 * 里面包含了 Math, Date, Array 等
 * 其中有一个window对象指向的是自己
 */

var globalObject = {
  Date: '类',
  Array: '类',
  Window: this
}