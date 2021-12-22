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
  console.log(res) // success messagea
}, (err) => {
  console.log(err)
})

// 传入一个实现thenable接口的对象
promise.then((res) => {
  console.log(res) // success message
}, (err) => {
  console.log(err)
})