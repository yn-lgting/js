const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
    // resolve('success1')
  }, 300)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error2')
    // resolve('success2')
  }, 200)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('err')
    // console.log(lll)
    reject()
    // resolve('success3')
  }, 500)
})

Promise.allSettled([p1, p2, p3]).then((res) => {
  console.log('res', res)
  /**
   打印结果：[
            { status: 'rejected', reason: undefined },
            { status: 'rejected', reason: 'error2' },
            { status: 'fulfilled', value: 'success3' }
          ]
  */
}).catch((err) => {
  console.log('err',err)
})