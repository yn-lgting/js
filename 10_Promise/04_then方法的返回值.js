const promise = new Promise((resolve, reject) => {
  resolve('success')
})

/**
  then方法的返回值是一个新的Promise
  当then方法成功的回调返回了一个普通的值，类似于
  new Promise((resolve, reject) => {
    resolve(成功回调的值)
  })
 */
promise.then((res) => {
  console.log(res) // success
  // 返回一个普通的值，会作为then方法返回一个成功状态的Promise的成功回调的值
  // return 'success1'
  // 返回一个新的Promise
  /**
   返回一个promise时， 这个promise的状态会作为then方法返回的Promise状态
   */
  // return new Promise((resolve, reject) => {reject('errorrr')})
  /**
   * 返回一个实现了thenable的对象
   * then方法返回的promise状态由该对象的then方法决定
   */
  return {
    then(resolve, reject) {
      resolve('thenable success') 
    }
  }
}).then((res) => {
  // 普通的值
  //console.log(res) // success1
 // 新promise的值
 console.log('res', res)
}, (err) => { console.log('err',  err) })