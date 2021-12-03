Function.prototype.myBind = function(thisArg, ...args) {
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = this
  return function(...nArgs) {
    let concatArgs = [...args, ...nArgs];
    return thisArg.fn(...concatArgs);
  }
}

function foo(num1, num2, num3) {
  console.log(num1, num2, num3);
  return num1 + num2 + num3;
}

const newFoo = foo.myBind('123', 1,2)
console.log(newFoo(3,4))
