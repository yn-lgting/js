function foo(a, b) {
  // 1 2 [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(a, b, arguments)
  console.log(arguments[2]) // 3
  console.log(arguments.callee) // 获取函数本身foo
  // 转数组方法一
  console.log([...arguments]); 
  [...arguments].forEach(item => {
    console.log(item)
  }) 
  // 转数组方法2
    /**
     * slice截取数组 slice(开始下标, 结束下标) 返回新数组
     * 由于没有数组, 想要直接调用Array上原型的方法,
     * 需要.call去指定一个可遍历对象,
     * 内部相当于
     * Array.prototype.slice = function(start, end) {
     *  var arr = this // arguments
     * for(i = 0)...
     * }
     */
  const newArgs = Array.prototype.slice.call(arguments)
  // 或者直接这样写
  const newArgs2 = [].slice.call(arguments)

  // 转数组方法3
  const newArr3 = Array.from(arguments)
}

foo(1, 2, 3)


function foo2(num1) {
  console.log(arguments) // 1,2,3
}
foo2(1,2,3)
// es6推荐
const foo3 = (num1, ...args) => {
  console.log(args) // 2,3
}
foo3(1,2,3)