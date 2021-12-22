const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
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
    try {
      throw new Error('err')
    } catch (e) {
      reject('error')
    }
    resolve('success3')
  })
}, 500)

Promise.all([p1, p2, p3]).then((res) => {
  console.log(res) // [ 'success1', 'success2', 'success3' ]
}, (err) => {
  console.log('------', err)
}).catch((err) => {
  console.log('-------', err)
})