const obj = {
  name: 'gt',
}

Object.defineProperty(obj, 'age', {
  value: 18,
  configurabel: false, // 是否可删除, 后续描述符是否可删除
  enumerable: false, // 是否可枚举
  writable: false //是否可修改
})

delete obj.age
console.log(obj.age)

Object.defineProperty(obj, '_address', {
  value: 'HeNan',
  configurabel: false, // 是否可删除, 后续描述符是否可删除
  enumerable: false, // 是否可枚举
  writable: false //是否可修改
})

delete obj.age
console.log(obj.age)

Object.defineProperty(obj, 'address', {
  configurable: true,
  enumerable: false,
  get() {
    console.log('get address')
    return obj._address
  },
  set(value) {
    console.log('set address')
    this.address = value
  }
})

console.log(Object.keys(obj))
console.log(obj.address)
console.log(obj)