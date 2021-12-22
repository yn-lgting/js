const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
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
    // reject()
    resolve('success3')
  }, 500)
})

Promise.race([p1, p2, p3]).then((res) => {
  console.log(res) // 'success2'
}).catch((err) => {
  console.log(err) // error2
})