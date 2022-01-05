async function async1() {
  console.log('async1 start')
  await async2() // await 后面的代码块相当于是一个微任务
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('xxx')

setTimeout(() => {
  console.log('setTimeout')
}, 0)
async1()

new Promise((resolve, reject) => {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
})
console.log('script end')

/**
 sctipt start
 async1 start
 async2
 promise1
 script end
 async1 end
 promise2
 setTimeout
 */