# Promise

### 1. Promise的基本使用

* Promise使用来处理异步函数的
* 接受一个executor(执行器函数)，内部的代码块是同步的，当Promise的状态被确定之后，也会执行剩余代码
* 它有三种状态
  * 在调用resolve/reject之前， 初始值为pending状态， 意味Promise实例状态是**未定义的**/**未兑现的**
  * 在调用resolve之后， 状态为：fulfilled/resolved， 意味着Promise的实例状态为**成功状态/已兑现状态**
  * 在调用reject之后， 状态为：rejected，意味Promise实例的状态为 **失败状态/已拒绝状态**

```js
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
```

### 2. resolve接受不同参数的不同逻辑

* resolve接受一个普通值时【string， number， object...】，会作为then方法成功回调的结果
* resolve接受一个新的promise时， 当前promise的状态由新的promise决定
* resolve接受一个实现了thenable接口的对象时， promise的状态由该then方法决定

```js
const promise = new Promise((resolve, reject) => {
// 传递普通类型的值，会作为then方法成功回调的结果
  // resolve('string, object, number...') 

// 传入一个新的Promise实例时，那么当前Promise的实例状态由新的Promise实例决定
  //resolve(new Promise(() => {})) // 当前Promise为pending状态不会执行then方法里面去
  // resolve(Promise.resolve('success message'))

// 传递一个对象 且此对象实现了then方法，（或者说该对象实现了thenable借口）并且由该then方法决定后续状态
 resolve({
   then(resolve, reject) {
     resolve('success message')
   }
 })
})

// 传入普通数据类型的值
// promise.then((res) => {
//   console.log('res;', res) // success message
// }, (err) => {
//   console.log(err)
// })

// 传入一个新的Promise
promise.then((res) => {
  console.log(res) // success message
}, (err) => {
  console.log(err)
})

// 传入一个实现thenable接口的对象
promise.then((res) => {
  console.log(res) // success message
}, (err) => {
  console.log(err)
})
```

### 3. then方法成功回调返回值的不同逻辑

* then方法返回一个新的Promise
* 这个新的Promise值由then方法内部回调返回值去决定的
  * 如果返回一个普通的值，then方法返回的Promise状态是成功状态，且该值会作为成功回调的参数
  * 如果返回一个新的Promise， 那么then方法返回的Promise状态由回调返回的Promise的状态决定
  * 如果返回了一个实现thenable的对象， 那么then方法返回的Promise状态，由该then方法的then方法决定

```js
const promise = new Promise((resolve, reject) => {
  resolve('success')
})

/**
  then方法的返回值是一个新的Promise
  当then方法成功的回调返回了一个普通的值，类似于
  new Promise((resolve, reject) => {
    resolve(成功回调的值)
  })
 */
promise.then((res) => {
  console.log(res) // success
  // 返回一个普通的值，会作为then方法返回一个成功状态的Promise的成功回调的值
  // return 'success1'
  // 返回一个新的Promise
  /**
   返回一个promise时， 这个promise的状态会作为then方法返回的Promise状态
   */
  // return new Promise((resolve, reject) => {reject('errorrr')})
  /**
   * 返回一个实现了thenable的对象
   * then方法返回的promise状态由该对象的then方法决定
   */
  return {
    then(resolve, reject) {
      resolve('thenable success') 
    }
  }
}).then((res) => {
  // 普通的值
  //console.log(res) // success1
 // 新promise的值
 console.log('res', res)
}, (err) => { console.log('err',  err) })
```

### 4. then方法返回失败回调逻辑

* Promise的executor执行器中或者then方法回调中调用了reject，或者代码抛出了错误，会走到下一个then方法的失败回调当中
* catch方法一般用来统一捕获promise链的错误，当promise链中有失败逻辑或者抛出错误都会被catch到，它只会捕获第一个错误
* catch方法也会返回一个Promise，这个Promise的状态也是取决于catch函数的返回值
* reject的捕获高于catch的捕获，如果走了reject的逻辑，就不会再进入catch逻辑，then方法的返回结果也取决于reject函数返回的结果

```js
const promise = new Promise((resolve, reject) => {
  // reject('err message')
  // resolve('xxx')
  throw new Error('err')
})

promise.then((res) => {
  return Promise.reject('err message')
},(err) => {
  console.log('reject', err)
}).catch((err) => {
  // 写了reject时， 不会进入到cathc里面
  console.log('catch', err)
})
```

### 5. finally

* 不管成功还是失败都会走的回调 ，一般用来做收尾工作

```js
// finally方法不管是成功状态还是失败状态都会执行的回调
new Promise((resolve, reject) => {
  resolve('success message')
  // reject('err message')
}).then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
}).finally(() => {
  console.log('done')
})
```



### 6.Promise中的类方法

####  6.1 Prmise.resolce Promise.reject

* 这两个方法会返回一个新的Promise，新Promise的状态由传入的参数决定， 跟then方法接受不同返回值表现的逻辑一致

#### 6.2 Promise.all

* 处理多个Promise任务,并且有序拿到传入Promise的结果
* 有一个任务失败了或者抛出错误都会走rejected逻辑， 如果三个Promise结果均为fulfilled，那么走成功逻辑
* 如果所有Promise均为fulfilled，结果会被按照参数传入的顺序将结果放入一个数组中

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success1')
  }, 300)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject('error2')
    resolve('success2')
  }, 400)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success3')
  }, 500)
})

Promise.all([p1, p2, p3]).then((res) => {
  console.log(res) // [ 'success1', 'success2', 'success3' ]
}).catch((err) => {
  console.log(err) // error
})
```



#### 6.3 Promise.race race[竞赛]

* 处理多个Promise，拿到最先获得状态【不管时fulfilled还是rejected】的Promise继续往下调用
* 下一步走成功还是失败由第一个拿到状态的Promise决定

```js
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
```

#### 6.4 Promise.allSettled

* 跟Promise.all相比，allSettled
* 回调的第一个参数为一个数组，里面存放着对象，记录每个Promise的状态，和成功的值value，失败的原因reasin

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
    resolve('success1')
  }, 300)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error2')
    resolve('success2')
  }, 200)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
    resolve('success3')
  }, 500)
})

Promise.allSettled([p1, p2, p3]).then((res) => {
  console.log(res)
  /**
   成功打印结果：[
            { status: 'rejected', reason: undefined },
            { status: 'rejected', reason: 'error2' },
            { status: 'fulfilled', value: 'success3' }
          ]
  */
}).catch((err) => {
  console.log(err)
})
```



#### 6.5 Promise.any

* any至少等待一个Promise成功结果，如果全部失败回抛出一个错误： err [AggregateError: All promises were rejected]
* 如果全部失败 可以通过err.errors获取失败结果
* 如果成功只取第一个成功结果的值，走成功逻辑

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject()
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
    resolve('success3')
  }, 500)
})

Promise.any([p1, p2, p3]).then((res) => {
  console.log('res', res) // 只取第一个成功状态的结果： success2
}).catch((err) => {
  console.log('err',err.errors)
})
```

### 6.6 Promise 异步代码捕获问题

* 如果在异步代码中抛出错误，Promise是捕获不到的，需要在异步代码中使用try取捕获并调用reject

```js

new Promise((resolve, reject) => {
  setTimeout(() => {
      console.log(a) // 报错，catch捕获不到异步代码的错误
  })
}).then((res) => {
  console.log('res', res)
}, (err) => {
  console.log('err----', err)
})

=======================================在异步代码中捕获并调用reject====================================
new Promise((resolve, reject) => {
  setTimeout(() => {
    // 异步捕获
    try {
      console.log(a)
    } catch (e) {
      reject('a is not defined') // 调用reject
    }
  })
}).then((res) => {
  console.log('res', res)
}, (err) => {
  console.log('err----', err)
})
```



知乎回答

首先，在非async函数中，try-catch并不能捕获异步操作中产生的异常，`Promise`/`setTimeout`都是典型的异步操作。
其次，`Promise`的`catch`会在`resolve`被调用之前`throw`的`Error`对象，或者`reject`被调用后触发。
最后，`setTimeout`是个异步操作，当前操作执行完之后才会执行，所以当前的try-catch并不能处理`setTimeout`回调的异常。

综合以上3点，

1. 你的`throw`在`setTimeout`中，且没有`reject`，`Promise`不能`catch`到
2. 如果移动到`setTimeout`下一句，相当于你的`Promise`没有`resolve`之前`throw`了`Error`
