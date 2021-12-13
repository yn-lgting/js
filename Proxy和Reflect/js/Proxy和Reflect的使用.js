const obj = {
  name: 'gt'
}

const proxyObj = new Proxy(obj, {
  get: function (target, key) {
    console.log('获取属性')
    return Reflect.get(target, key)
  },
  set: function(target, key, value) {
    console.log('设置属性')
    return Reflect.set(target, key, value)
  }
})

proxyObj.name = 'gtt'
console.log(proxyObj.name)
