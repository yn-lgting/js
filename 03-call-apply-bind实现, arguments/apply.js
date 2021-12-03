Function.prototype.myApply = myApply;
function myApply(thisArg, argArray) {
  thisArg = thisArg ? Object(thisArg) : window;
  argArray = argArray || []; // 如果没有传递参数, 则赋值argArray为一个空数组
  thisArg.fn = this
  return thisArg.fn(...argArray);
}

function foo(num, num1) {
  console.log(num, num1);
}

foo.myApply('abc', [100, 200])