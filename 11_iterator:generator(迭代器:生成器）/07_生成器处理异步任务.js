// 模拟异步请求
function request(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(params), 1000)
  })
}
// 利用生成器发送请求
function* getData() {
  const result = yield request('a')
  const result1 = yield request(`${result}-b`)
  return yield request(`${result1}-c`)
}
// // 获取生成器返回的生成器对象，它遵守迭代器协议[应有next方法， 返回一个对象{done: false, value: xxx}]
// const getDataIterator = getData()
// // 调用next方法执行第一个yield， 且返回的对象value是一个promise
// getDataIterator.next().value.then((value) => {
//   // 拿到value， 再调用下一个next且将处理好的参数传递过去
//   console.log(value)
//   getDataIterator.next(value).value.then((value) => {
//     console.log(value)
//     // 同上规律可继续往下调用
//     getDataIterator.next(value).value.then((value) => {
//       console.log(value)
//     })
//   })
// })
// 讲上诉方法封装
function handleAsync(generator) {
  return new Promise((resolve, reject) => {
    const iterator = generator()
    function exec(value) {
      const result = iterator.next(value)
      if (result.done) {
        try {
          result.value.then((value) => {
            resolve(value)
          })
        } catch (e) {
          resolve(value)
        } 
      } else {
        result.value.then((value) => {
          exec(value)
        })
      }
    }
    exec()
  })
}
handleAsync(getData).then(value => {
  console.log(value)
})

// TJ 封装的co包
const co = require('co')
co(getData).then(result => {
  console.log(result)
})
