// 被async标识的函数是一个异步函数
// async function asyncFn() {
//   throw new Error('async fn error') // 抛错后走失败逻辑，不会打断代码执行
//   console.log('async')
// }
// console.log('test')
// console.log(asyncFn())// 返回一个promise
// asyncFn().then((res) => {
//   console.log(res)
// }, (reason) => {
//   console.log('reason')
// })


// await 
/**
  async 函数内部可以使用await关键子
  await
    * await后通常跟上一个表达式，该表达式会返回一个promise
    * await会等到Promise的状态变为fulfilled状态，才会执行后面的代码
    * 如果await后的Promise状态是rejected状态，则异步函数返回的promise会是reject
 */

function request() {
  return new Promise((resolve, reject) => {
    // setTimeout(() => resolve('success'), 2000)
    setTimeout(() => reject('err'), 2000)
  })
}

async function asyncFo() {
  const res = await request()
  console.log(res)
  return Promise.resolve(res)
}
asyncFo().then('', (reason) => { // 当异步函数捕中await等待的promise状态是reject状态时，可以在这里捕获
  console.log(reason)
})
console.log('sync')

Promise.resolve().then((res) => {
  console.log(1)
  return Promise.resolve(4)
}).then((res) => {
  console.log(res)
})

Promise.resolve().then((res) => {
  console.log(3)
})