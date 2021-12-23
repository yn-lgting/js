// 定义Promise状态
const PROMISE_PENDING = 'pending'
const PROMISE_FULFILLED = 'fulfilled'
const PROMISE_REJECTED = 'rejected'

class YnPromise{
  constructor(executor) {
    // 初始化Promise状态
    this.status = 'pending'
    // 初始化rejected原因
    this.reason = undefined
    // 初始化fulfilled值
    this.value = undefined
    // 执行器接受两个函数： resolve, reject, 接受传递过来的value 和 reason
    const resolve = (value) => {
      // 调用之前判断当前状态，如果是pending状态再调用
      if (this.status === PROMISE_PENDING) {
        // 修改状态为成功状态
        this.status = PROMISE_FULFILLED
        console.log('调用resolve')
        this.value = value
        // 执行onFulfilled或onRejected回调时，应该是一个异步的操作，因为如果executor里面没有异步代码，js逐行执行，此时的onFulfilled还是未定义的
        // queueMicrotask 创建微任务队列
        queueMicrotask(() => {
          this.onFulfilled(value)
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PROMISE_PENDING) {
        this.status = PROMISE_REJECTED
        console.log('调用reject')
        this.reason = reason
        queueMicrotask(() => {
          this.onRejected(reason)
        })
      }
    }
    // 调用执行器
    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    // 收集回调函数，在状态改变时调用相应回调
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

const promise = new YnPromise((resolve, reject) => {
  setTimeout(() => {
    reject('error message')
    resolve('success message')
  })
})

promise.then((res) => {
  console.log(res)
}, (reason) => {
  console.log(reason)
})