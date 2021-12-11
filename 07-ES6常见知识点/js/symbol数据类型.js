// Symbol会创建一个独一无二的值，es6之后一般作为对象属性的key
const s1 = Symbol()
const obj = {
  [s1]: 'abc'
}
console.log(obj[s1])
obj[s1] = 'cba'

// 可以通过传递描述符, 通过实例.description可以获取到描述符
const s2 = Symbol('name')
console.log(s2.description) // name

// 通过Objct.defineProperty去添加属性
Object.defineProperty(obj, s2, {
  configurable: true,
  enumerable: true,
  eritable: true,
  value: 'gt',
})
/**
 * Symbol是无法直接被遍历出来的(Object.keys等)
 * 如果需要获取属性且遍历，需要通过Object.getOwnPropertySymbols()获取symobol组成的数组
 */

const symbols = Object.getOwnPropertySymbols(obj)
console.log(symbols)
for(const symbol of symbols) {
  console.log(obj[symbol])
}

// 通过symbol.for(key)创建相同的symbol
const s4 = Symbol.for('aaa')
const s5 = Symbol.for('aaa')
console.log(s4 === s5) // true

// 获取symbol的key
const key = Symbol.keyFor(s4)
console.log(key)
