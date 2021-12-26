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
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    // if (typeof onFulfilled !== 'function'
    //   && typeof onRejected !== 'function') return
    onRejected = typeof onRejected !== 'function' ? ((err) => { throw err}) : onRejected
    // 判断有没有传入成功回调如果没有则直接走finally
    onFulfilled = typeof onFulfilled !== 'function' ? (() => {}) : onFulfilled

    return new YnPromise((resolve, reject) => {
      if (this.status === PROMISE_FULFILLED) {
        return catchFnError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_REJECTED) {
        return catchFnError(onRejected, this.reason, resolve, reject)
      }
      this.onFulfilledFns.push(() => {
        catchFnError(onFulfilled, this.value, resolve, reject)
      })
      this.onRejectedFns.push(() => {
        catchFnError(onRejected, this.reason, resolve, reject)
      })
    })
  }
  catch(catchFn) {
    return this.then(undefined, catchFn)
  }
  finally(finallyFn) { // 沿着catch思路，把成功或失败回调直接传入then方法，这样不管是成功还是失败状态都会执行finally
    return this.then(finallyFn, finallyFn)
  }

  static resolve = (value) => {
    return new YnPromise((resolve) => {
      resolve(value)
    })
  }
  static reject = (reason) => {
    return new YnPromise((undefined, reject) => {
      reject(reason)
    })
  }
  static all = (promiseFns) => {
    return new YnPromise((resolve, reject) => {
      const result = []
      for (const promise of promiseFns) {
        promise.then((res) => {
          result.push(res)
          if (result.length === promiseFns.length) return resolve(result)
        }, (err) => {
          setTimeout(() => {
            console.log(result)
          }, 2000)
          return reject(err)
        })
      }
    })
  }
  static allSettled = (promises) => {
    return new YnPromise((resolve, reject) => {
      const result = []
      promises.forEach(promise => {
        promise.then((value) => {
          result.push({
            status: 'fulfilled',
            value,
          }) 
          if (result.length === promises.length) return resolve(result)
        }, (reason) => {
          result.push({
            status: 'rejected',
            reason
          })
          if (result.length === promises.length) return resolve(result)
        })
      })
    })
  }
  static race = (promises) => {
    return new YnPromise((resolve, reject) => {
      for (const promise of promises) {
        promise.then((value) => {
          resolve(value)
        }, (reason) => {
          reject(reason)
        })
      }
    })
  }
  static any = (promises) => {
    return new YnPromise((resolve, reject) => {
      const reasonResult = []
      for(const promise of promises) {
        promise.then(resolve, (reason) => {
          reasonResult.push(reason)
          if (promises.length === reason.length) return reject(new AggregateError(reasonResult))
        })
      }
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
    resolve('success')
    // reject('error')
    // throw new Error('err message')
  // })
})

// YnPromise.resolve('success').then((res) => {console.log(res)})
// YnPromise.reject('error').then(undefined, (err) => {console.log(err)})

const p1 = new YnPromise((resolve, reject) => {
  setTimeout(() => {
    reject('err')
    resolve('success')
  })
})
const p2 = new YnPromise((resolve, reject) => {
  reject('err1')
  resolve('success1')
})
const p3 = new YnPromise((resolve, reject) => {
  reject('err2')
  resolve('success2')
})

// YnPromise.race([p1, p2, p3]).then((res) => {
//   console.log(res)
// }, (err) => {
//   console.log(err)
// })
YnPromise.any([p1, p2, p3]).then((res) => {
  console.log(res)
}, (err) => {
  console.log(err.errors)
})