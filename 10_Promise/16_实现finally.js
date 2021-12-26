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
  /**
    catch 实现思路
      1. catch一般用来统一捕获，所以在promise的状态是rejected时，catch需捕获到该错误
      2. 但是如果then回调指定了错误回调，那么catch就不会执行，在链式调用时，保证catch能捕获到没有指定错误回调时的错误
    一：需要解决的问题 
      1. 不会捕获then回调已经拦截的错误
      2. 链式调用时，能捕获任意一个有错误但没有指定错误回调的then方法
    二：解决方案
      1. 直接在catch方法中调用then方法，且将catch回调作为then方法的失败参数, 最后将then方法返回的promise返回
      2. 在then方法中判断此次调用是否传递了错误回调，如果没有，直接给错误回调手动赋值一个错误回调，如果有就执行传进来的错误回调
         错误回调：((rejected的reason) => {throw rejected的reason})
      3. 注意：这个回调一定要抛出失败原因，因为这样才能在捕获异常函数中继续走失败回调，否则下一次就会直接走成功回调，从而导致无法捕获
    三. 代码执行思路 + 总结
      当promise是失败状态时[不管是第一次，还是链式调用]，都会来到then方法，此时如果传入了错误回调，会直接将错误回调执行，
      如果没有指定错误回调，then方法又会自行添加错误回调，并在错误回调中抛出了该错误，这样在捕获异常的函数中就又返回了失败状态的promise
      而此时如果then被链式调用，又会来到失败回调，那么继续回到then方法中，判断该then方法是否传入失败回调
      如果传入则直接执行失败回调[下一步走成功逻辑，不会被catch到]，如果没有传递则继续抛出，直到有错误回调的then方法出现，或者被catch捕获到。
   */
  catch(catchFn) {
    return this.then(undefined, catchFn)
  }
  finally(finallyFn) { // 沿着catch思路，把成功或失败回调直接传入then方法，这样不管是成功还是失败状态都会执行finally
    return this.then(finallyFn, finallyFn)
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
promise.then((res) => {
  console.log('res:', res)
  return 'success1'
},(err) => {
  console.log('err:', err)
  return 'err message1'
}).then((res) => {
  console.log('res2:',res)
  // throw new Error('err message2')
}).catch((err) => {
  console.log('catchError:', err)
  return 'xxx'
}).finally(() => {
  console.log('finally exec')
})