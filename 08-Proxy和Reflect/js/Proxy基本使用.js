const obj = {
  name: 'gt',
  age: 18
}
// Proxy(被代理对象, {捕获器})
let proxyObj = new Proxy(obj, {
  // target是被代理对象
  get: function(target, key) {
    console.log('获取对象属性', target, key)
    return target[key]
  },
  set(target, key, value) {
    console.log('设置对象属性', target, key, value)
    target[key] = value
  },
  has: function(target, key) {
    console.log('调用了in方法')
  }
})

// 1. 如果不传入捕获器，修改代理对象里面的属性，被代理对象的属性会同步更改
proxyObj.name = 'sj'
console.log(proxyObj.name)
console.log(obj.name)
console.log(proxyObj === obj) // false
// 2.重新赋值代理对象不会影响被代理对象
// proxyObj = {}

// 3. 监听调用in方法
console.log('name' in proxyObj)