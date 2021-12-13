const obj = {
  _name: 'tm',
  get name() {
    return this._name
  },
  set name(value) {
    return this._name = value
  }
}

const proxyObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(target, key, receiver) // 被代理对象，key， 代理对象
    console.log(key)
    return Reflect.get(target, key, receiver)

    /**
     * 当获取name时， 会触发get方法，以下写法会跳过代理对象，直接去被代理对象中获取name，失去代理意义
     * receiver则代表代理对象，传入receiver方法后，被代理对象里的this会变成代理对象，从而触发代理对象的get name,
     * 传入receive之后， 会触发两次get捕获器， 一次为代理对象触发被代理对象的getname， 一次为被代理对象触发getname
     */
    // return Reflect.get(target, key) 
  }
})

console.log(proxyObj.name)