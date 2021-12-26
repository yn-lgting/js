const PROMISE_PENDING = 'pending'
const PROMISE_FULFILLED = 'fulfilled'
const PROMISE_REJECTED = 'rejected'
class YnPromise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = 'pending'
    this.onFulfilledFns = []
    this.onRejectedFns = []
    const resolve = (value) => {
      if (this.status === PROMISE_PENDING) {
        this.status = PROMISE_FULFILLED
        this.value = value
        queueMicrotask(() => {
          this.onFulfilledFns.forEach((onFulfilled) => {
            onFulfilled(value)
          })
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PROMISE_PENDING) {
        this.status = PROMISE_REJECTED
        this.reason = reason
        queueMicrotask(() => {
          this.onRejectedFns.forEach((onRejected) => {
            onRejected(reason)
          })
        })
      }
    }
    try{
      executor(resolve, reject)
    } catch(err) {
      // 执行器中捕获到错误直接调用reject将状态修改为失败状态
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    // 暂不考虑thenable对象
    if (typeof onFulfilled !== 'function'
      && typeof onRejected !== 'function') return
    // then方法返回一个新的Promise，除了抛出异常，都是返回resolve
    return new YnPromise((resolve, reject) => {
      if (this.status === PROMISE_FULFILLED) {
        // 拿到返回值且调用resolve
        // const result = onFulfilled(this.value)
        // return resolve(result)
        return catchFnError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_REJECTED) {
        // 拒绝逻辑有返回值时，继续调用resolve
        // const result = onRejected(this.reason)
        // return resolve(result)
        return catchFnError(onRejected, this.reason, resolve, reject)
      }
      /**
       当Promise的状态是异步获取到的时，不能直接通过调用拿到返回值，所以这里传入一个函数
       让该函数执行回调的函数且拿到回调函数返回的值
       */
      this.onFulfilledFns.push(() => {
        // const result = onFulfilled(this.value)
        // return resolve(result)
        catchFnError(onFulfilled, this.value, resolve, reject)
      })
      this.onRejectedFns.push(() => {
        // const result = onRejected(this.reason)
        // return resolve(result)
        catchFnError(onRejected, this.reason, resolve, reject)
      })
    })
  }
}

// 封装捕获异常错误函数
function catchFnError(fn, value, resolve, reject) {
  try {
    const result = fn(value)
    return resolve(result)
  } catch (e) {
    reject(e)
  }
}

const promise = new YnPromise((resolve, reject) => {
  // setTimeout(() => {
    // resolve('success')
    // reject('error')
    throw new Error('err message')
  // })
})
/**
  多次调用promise.then时，怎么保证对应的value是正确的
    *：多次调用的value肯定是唯一的，就是Promise里resolv或reject接受的那个值
    而后续链式调用时，返回的是新的promise，每次都会调用resolve或reject
    所以对应的value或reason是then回调中手动返回的值
 */

promise.then((res) => {
  console.log('res:', res)
  return 'success1'
}, (err) => {
  console.log('err:', err)
  throw new Error('err message')
  // return 'error1'
}).then(res => {
  console.log('res1:', res)
}, (err) => {
  console.log('err1:', err)
})

// promise.then((res) => {
//   console.log('resa:', res)
// }, (err) => {
//   console.log('erra:', err)
//   return 'error1'
// }).then((res) => {
//   console.log('resa:', res)
// }, (err) => {
//   console.log('erra:', err)
// })

// setTimeout(() => {
//   promise.then((res) => {
//     console.log('async:', res)
//   }, (err) => {
//     console.log('async:', err)
//   })
//   console.log(promise.onRejectedFns)
// }, 1000)

// new Promise((resolve, reject) => {
  //   resolve(1)
  // }).then(2).then(3)