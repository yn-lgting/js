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
            onRejected && onRejected(reason)
          })
        })
      }
    }
    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    /**
      当我们对then不止一次调用，或者是异步调用时，此时Promise的状态可能已经不是pending状态，
      所以应该直接执行传进来的回调函数
     */
    if (this.status === PROMISE_FULFILLED) return onFulfilled && onFulfilled(this.value)
    if (this.status === PROMISE_REJECTED) return onRejected && onRejected(this.reason)
    /**
     当传进来回调函数后， Promise还是一个pending状态时，此时应该收集所有then方法的回调
     当Promise的状态改变时，统一循环调用
     */
    if (typeof onFulfilled === 'function') this.onFulfilledFns.push(onFulfilled) 
    if (typeof onRejected === 'function') this.onRejectedFns.push(onRejected)

    // 总结： pending状态收集依赖，等待改变时统一遍历回调， fulfilled/rejected状态时， 直接执行回调
  }
}

const promise = new YnPromise((resolve, reject) => {
  setTimeout(() => {
    reject('error')
    resolve('success')
  })
})

promise.then((res) => {
  console.log('res:', res)
}, (err) => {
  console.log('err:', err)
})

promise.then((res) => {
  console.log('res2:', res)
}, (err) => {
  console.log('err2:', err)
})

setTimeout(() => {
  promise.then((res) => {
    console.log('async:', res)
  }, (err) => {
    console.log('async:', err)
  })
  console.log(promise.onRejectedFns)
}, 1000)