const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject()
    resolve('success1')
  }, 300)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject('error2')
    resolve('success2')
  }, 200)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success3')
  }, 500)
})

Promise.any([p1, p2, p3]).then((res) => {
  console.log('res', res) // 只取第一个成功状态的结果： success2
}).catch((err) => {
  console.log('err',err.errors)
})