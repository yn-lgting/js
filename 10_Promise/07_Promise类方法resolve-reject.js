/**
  Promise.resolve 和 Promise.reject 都会创建一个promise并返回
  这个新的promise的状态由传入的结果决定
 */
const promise = Promise.resolve(Promise.reject(Promise.reject(Promise.reject(123))))
promise.then((res) => {
  console.log('res', res)
}, (err) => {
  console.log('err', err)
  err.then((res) => {
    console.log(res)
  }, (err) => {
    console.log(err)
    err.then((res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  })
})