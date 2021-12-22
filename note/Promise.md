# Promise

### 1. Promise的基本使用

* Promise使用来处理异步函数的
* 接受一个executor(执行器函数)，内部的代码块是同步的，当Promise的状态被确定之后，也会执行剩余代码
* 它有三种状态
  * 在调用resolve/reject之前， 初始值为pending状态， 意味Promise实例状态是**未定义的**/**未兑现的**
  * 在调用resolve之后， 状态为：fulfilled/resolved， 意味着Promise的实例状态为**成功状态/已兑现状态**
  * 在调用reject之后， 状态为：rejected，意味Promise实例的状态为 **失败状态/已拒绝状态**

```js
/**
  Promise 有三种状态
  1 pending 悬而未决的，初始状态
  2 resolved / fulfilled， 调用reslove之后的状态， 意味此时的promise实例为已兑现/成功状态
  3 rejected 调用reject之后的状态， 意味此时promise实例为已拒绝/失败状态
 */

new Promise((resolve, reject) => {
  // executor里的代码是同步执行的， 即使状态被确定了， 还是会执行剩余代码
  // then回调函数是异步的，是个微任务
  // Promise的状态一旦确定则无法再被更改
  console.log('Promise1')
  resolve('success')
  console.log('Promise2')
}).then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})
```

### 2. resolve接受不同参数的不同逻辑

* resolve接受一个普通值时【string， number， object...】，会作为then方法成功回调的结果
* resolve接受一个新的promise时， 当前promise的状态由新的promise决定 可以通过返回一个pending状态的promise中段promise链
* resolve接受一个实现了thenable接口的对象时， promise的状态由该then方法决定

```js
const promise = new Promise((resolve, reject) => {
// 传递普通类型的值，会作为then方法成功回调的结果
  // resolve('string, object, number...') 

// 传入一个新的Promise实例时，那么当前Promise的实例状态由新的Promise实例决定
  //resolve(new Promise(() => {})) // 当前Promise为pending状态不会执行then方法里面去
  // resolve(Promise.resolve('success message'))

// 传递一个对象 且此对象实现了then方法，（或者说该对象实现了thenable借口）并且由该then方法决定后续状态
 resolve({
   then(resolve, reject) {
     resolve('success message')
   }
 })
})

// 传入普通数据类型的值
// promise.then((res) => {
//   console.log('res;', res) // success message
// }, (err) => {
//   console.log(err)
// })

// 传入一个新的Promise
promise.then((res) => {
  console.log(res) // success message
}, (err) => {
  console.log(err)
})

// 传入一个实现thenable接口的对象
promise.then((res) => {
  console.log(res) // success message
}, (err) => {
  console.log(err)
})
```

