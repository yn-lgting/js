const promise = new Promise((resolve, reject) => {
  // reject('err message')
  // resolve('xxx')
  throw new Error('err')
})

promise.then((res) => {
  return Promise.reject('err message')
},(err) => {
  console.log('reject', err)
}).catch((err) => {
  // 写了reject时， 不会进入到cathc里面
  console.log('catch', err)
})