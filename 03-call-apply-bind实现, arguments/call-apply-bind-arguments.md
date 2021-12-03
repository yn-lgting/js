#### 1.call
```js
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
```

#### 2.apply
```js
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
```

#### 4.bind
```js
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

```



#### 5. arguments
1. arguments是一个对应于传递给函数的参数的类数组对象[array like]
2. 他存在于函数的AO中
3. 箭头函数是没有arguments, 会去上层作用域里找(在全局作用域下, 浏览器是没有arguments的, node中是有的)
4. 普通函数的arguments是全部参数组成的array like
5. es6推荐使用剩余参数, ...args, 不包含本身前定义的参数
```js
function foo(num1) {
  console.log(arguments) // 1,2,3
}
foo(1,2,3)

// es6推荐
const foo3 = (num1, ...args) => {
  console.log(args) // 2,3, 不包含1
}
foo3(1,2,3)
```