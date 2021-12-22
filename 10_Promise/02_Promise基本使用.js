/**
  Promise 有三种状态
  1 pending 悬而未决的，初始状态
  2 resolved / fulfilled， 调用reslove之后的状态， 意味此时的promise实例为已兑现/成功状态
  3 rejected 调用reject之后的状态， 意味此时promise实例为已拒绝/失败状态
 */

new Promise((resolve, reject) => {
  // executor里的代码是同步执行的， 即使状态被确定了， 还是会执行剩余代码
  // then回调函数是异步的，是个微任务
  // Promise的状态一旦确定则无法再被更改
  console.log('Promise1')
  resolve('success')
  console.log('Promise2')
}).then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})