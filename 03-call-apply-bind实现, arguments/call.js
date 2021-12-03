Function.prototype.myCall = myCall

/**
 * 这里的...args表示剩余参数, 是一个数组
 * 当参数个数不确定时, 可以用...args去代替, 是一个数组
 */
function myCall(thisArg, ...args) {
  // console.log(args) // [100, 200]
  thisArg = thisArg ? Object(thisArg) : window
  thisArg.fn = this // 这里this为隐式调用的函数
  return thisArg.fn(...args) // 展开剩余参数
}

function foo(params, params1) {
  console.log("foo", this, params, params1);
  return params + params1;
}

let result = foo.myCall({name: 111}, 100, 200)
let result2 = foo.myCall(undefined, 100, 200)
console.log(result, result2)