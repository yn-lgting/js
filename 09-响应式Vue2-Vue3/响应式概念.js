const data = {
  name: '123',
  age: 20
}

/**
 * 1. 创建类 用来收集依赖， 执行依赖等操作
 */

class Depdens {
  constructor() {
    this.reactiveFns = []
  }
  addReactiveFns(fn) {
    typeof fn === 'function' ? this.reactiveFns.push(fn) : false
  }
  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

// const dep = new Depdens()

const weakMap = new WeakMap()
function getDep(target, key) {
  let map = weakMap.get(target)
  if (!map) {
    map = new Map()
    weakMap.set(target, map)
  }
  let dep = map.get(key)
  if (!dep) {
    dep = new Depdens()
    map.set(key, dep)
  }
  return dep
}

// const proxyObject = new Proxy(data, {
//   get(target, key, receiver) {
//     const depends = getDep(target, key)
//     // console.log(depends)
//     depends.addReactiveFns(reactiveFns)
//     return Reflect.get(target, key, receiver)
//   },
//   set(target, key, value, receiver) {
//     Reflect.set(target, key, value, receiver)
//     const dep = getDep(target, key)
//     dep.notify()
//   }
// })

function createProxy(target) {
  const proxyObject = new Proxy(target, {
    get(target, key, receiver) {
      const dep = getDep(target, key, receiver)
      dep.addReactiveFns(reactiveFns)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      const dep = getDep(target, key)
      dep.notify()
    }
  })
  return proxyObject
}

// function es5CreateProxy(target) {
//   const keys = Object.keys(target)
//   keys.forEach((key) => {
//     let value = target[key] // 使用Object.defineProperty 需要创建自由变量， 在get和set中使用这个自由变量，不能直接使用obj[key]的形式， 否则会死循环
//     Object.defineProperty(target, key, {
//       get() {
//         console.log('get 执行')
//         const dep = getDep(target, key)
//         dep.addReactiveFns(reactiveFns)
//         return value
//       },
//       set(newValue) {
//         console.log('set 执行')
//         value = newValue
//         const dep = getDep(target, key)
//         dep.notify()
//       }
//     })
//   })
//   return target
// }

const proxyObject = createProxy(data)
// const proxyObject = es5CreateProxy(data)

let reactiveFns = null
function watchFn(fn) {
  reactiveFns = fn
  fn()
  reactiveFns = null
}

function foo() {
  console.log(proxyObject.name, 'name依赖一执行')
}
function bar() {
  console.log(proxyObject.age, 'age依赖执行...')
}

watchFn(foo)
watchFn(bar)


proxyObject.name = 'new gt'
proxyObject.name = 'gt'
proxyObject.age = 200