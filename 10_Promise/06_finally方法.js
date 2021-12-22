// finally方法不管是成功状态还是失败状态都会执行的回调
// new Promise((resolve, reject) => {
//   resolve('success message')
//   // reject('err message')
// }).then((res) => {
//   console.log(res)
// }, (err) => {
//   console.log(err)
// }).finally(() => {
//   console.log('done')
// })

// new Promise((resolve, reject) => {
//   reject('err message')
// }).then((res) => {
//   console.log(res)
// }, (err) => {
//   console.log(err)
//   // throw new Error('err message')
//   return Promise.resolve(err)
//   // return  
// }).then((res) => {
//   console.log('res', res)
// }, (err) => {
//   console.log(err)
// })
