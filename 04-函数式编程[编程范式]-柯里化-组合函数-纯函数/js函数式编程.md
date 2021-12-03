#### 纯函数Pure Function
* 认识
1. js符合函数式编程范式, 所以有纯函数概念
2. 如react中的reducer必须要求是一个纯函数
* 定义
1. 函数在相同的输入时, 会产生相同的输出
2. 该函数不能有语义上的可观察**副作用**, 如浏览器的点击事件.
* 副作用
1. 副作用[side effect]
2. 在执行一个函数时, 除了返回确定的函数返回值意外, 还产生了附加影响, 比如: 修改外界变量, 修改内部形参等等
3. 副作用在执行中往往时bug的温床
* 例子
```js
const arr = [1, 2, 3, 4, 5]

/** 
 * 1. slice 在传入确定的数组时, 会产生确定的输出
 * 2. 它不会修改原来的数组
 * 3. 符合纯函数条件
 */

// let newArr = arr.slice(0, 3)
// console.log(newArr)// 1, 2, 3
// console.log(arr)// [1, 2, 3, 4, 5]

/**
 * splice在传入确定的数组时虽然返回确定的值
 * 当时会修改原来的数组, 所以不是纯函数
 */
let newArr1 = arr.splice(0, 3)
console.log(newArr1) // [1, 2, 3]
console.log(arr) // [4, 5]
```
#### 柯里化[currying]
* 认识
1. 柯里化[currying]
2. 把接受多个参数的函数, 变成接收一个单一参数的函数, 并且返回新函数接收余下的参数的技术
3. 如果你固定某些参数, 则会得到 **接收到接收剩下参数** 的一个函数 
4. 只传递一部分参数取调用它, 让它返回一个新的函数去处理余下的参数, 这个过程为柯里化 
* 例子
```js
// 普通函数
function add(num1, num2, num3) {
  return num1 + num2 + num3;
}

// 柯里化
function sum(num) {
  return function(num2) {
    return function(num3) {
      return num1 + num2 + num3;
    }
  }
}

// 利用箭头函数简写柯里化

const arrowSum = num1 => num2 => num3 => {
  return num1 + num2 + num3;
}
const arrowSum = num1 => num2 => num3 => num1 + num2 + num3;
```
* 作用
1. 函数式编程中, 更希望函数处理的问题尽可能单一, 而不是将一堆流程交给一个函数取处理(柯里化单一职责) 
2. 柯里化demo
```js
// 柯里化demo

const log = (date) => {
  return type => {
    return message => {
      console.log(`[${date.getDate()}日 : ${date.getHours()}时] : ${type} : ${message}` )
    }
  }
}

// const newLog = log(new Date())
// newLog('新需求')('ant定制')
// newLog('新需求')('syx定制')

const newLog = log(new Date())('新BUG')
newLog('验证码BUG')
newLog('验证码BUG')
newLog('验证码BUG')
```
* 封装柯理化函数
```js
/**
 * 执行顺序
 * 1. createCurrie接受一个函数, 不做任何处理, 且返回一个接受参数的函数
 * 2. 此时外界调传入函数时, 得到的新函数即相当于调用currie函数, 而currie函数接受参数后, 先判断传入的参数个数是否大于目标函数的长度
 * 3. 大于则直接执行函数, 如果小于, 则返回一个新的函数且接受参数, 而此函数调用后内部递归调用currie函数, 去判断形参个数即可
 */

function createCurrie(fn) {
  const currie = (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...newArgs) => {
        return currie.apply(this, [...args, ...newArgs]);
      }
    }
  }
  return currie
}
```

#### 组合函数
* 定义: 组合(compose)函数 是js中函数的一种使用技巧
1. 例如某个数据需要两个函数依次调用, 每次处理该类型数据都需要调用两次
2. 将两个函数组合, 称之为组合函数(compose function)
```js
  function double(count) {
    return count * 2
  }
  function square(count) {
    return count ** 2
  }
  function square2(count) {
    return count * 3
  }
  // demo1
  function composeFn(fn1, fn2) {
    return function (count) {
      return fn2(fn1(count))
    }
  }

  let newFn = composeFn(double, square)

  console.log('result:', newFn(10))
 // dome2封装组合函数
  function myCompose(...fns) {
    fns.forEach(item => {
      if (typeof item !== 'function') {
        throw new TypeError('expected arguments are functions')
      }
    })
    return (count) => {
      let result = 0
      fns.forEach((item, index) => {
        result = item.call(this, index === 0 ? count : result)
      })
      return result
    }
  }

  const newFn = myCompose(double, square, square2)
  console.log(newFn(10))
```