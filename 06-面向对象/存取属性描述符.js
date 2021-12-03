let person = {
  name: 'gt',
  age: 18,
}
Object.defineProperty(person, '_address', {
  configurable: false,
  enumerable: false,
  value: '河南省'
})

Object.defineProperty(person, 'address', {
  configurable: true,
  enumerable: true,
  // 属性存储描述符， 不能同时存在writable和value
  get() { // 获取address时调用
    return this._address
  },
  set(value) { // 设置adderss时作用
    this._address = value
  }
})

console.log(person.address)