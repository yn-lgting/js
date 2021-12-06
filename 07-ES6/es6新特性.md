### 1. Let/const作用域提升

1. let/const和var的作用域提升区别
2. var声明的变量是可以在其声明之前访问的
3. 而let/const在其声明前访问会报错
4. 在ecma262中是这样描述的
   * let/const声明的变量，在其执行上下文的词法环境中已经被创建了，但是是无法访问的， 直到被赋值
   * 那么不能被访问到底叫不叫作用域提升， 这个没有官方定义， 个人理解为：在变量作用域中， 如果这个变量可以在声明之前被访问， 可以理解为作用域提升； 而let/const虽然已经被创建了， 但是是无法被访问的， 个人认为不能称之为作用域提升
   * 总结： let/const 没有作用域提升， 但是会在其执行上下文创建阶段被创建出来

### 2. let/const和window的关系

1. let和const是不会在window上添加任何属性的

2. 在之前ecma规范中， var声明的变量，是会添加到执行上下文中的VO 所指向GO/AO中， 当前最新的ecma规范已经剔除了VO的概念，
3. 新添加了VE（variable environment）的概念， 叫做变量环境，上下文中的变量和函数会作为环境记录（environment record）保存在变量环境中（函数的参数也会作为环境记录添加到变量环境中）
4. window在早期是和VO的地址是一样的，但是后来ecma规范了VE，也就是说window不再和GO是一个对象了， window对象是跟浏览器有关系的，为了适配，当我们用var声明变量时，会同步将GO中所添加的变量添加到window对象中， 而es6提出的let/const则不会被添加进去

 * 总结
 1. 综上所述，声明的变量会被作为环境记录添加到变量环境中
 2. 没有规范定义GO就是window对象，每个js引擎都会有自己GO的实现 
 3. v8中其实是通过variableMap的一个hashmap（哈希表） 来实现他们的存储
  4. 对于window对象早起而言，他就是GO， 在最新实现中其实是浏览器自身添加的全局对象，并且为了适配，保留了var关键字对window对象的影响

### 3. 块级作用域

1. 在es5之前，只有全局作用域和函数作用域，es6之后，在一个代码块里，let/const/类等关键字声明的变量是无法被外界访问的

### 4. 标签模版字符串

1. es6可以通过``去调用函数， 第一个参数为一个${}所分割的字符串数组， 后面的参数为模版字符串的表达式

```js
function foo(str, variable1, variable2) {
  console.log(str, variable1, variable2);// [ '字符1-', '-字符2-', '' ] gt 18
}

const variable = 'gt'
const variable2 = '18'

/**
 * 标签模版字符串
 * 通过``调用函数，函数对一个参数为模版字符串中表达式所分割的字符串所组成的数组
 * 后面的参数为模版字符串的表达式
 */
foo`字符1-${variable}-字符2-${variable2}`
```



### 5. 函数剩余参数

1. 如果函数参数以...开头的参数，他会将剩余参数放进一个数组
2. 剩余参数和arguments的区别
   * 剩余参数是没有对应形参的数组，而arguments是所有传递给函数的参数集合，且不是真正的数组，而是一个对象

### 6. 箭头函数知识点补充

1. 箭头函数是没有自己的显式原型的，所以不能通过new关键字去调用
2. 所有函数的形参默认值是会影响函数的length属性的，默认值后的所有形参是不会计入length属性中的

### 7. Symbol数据类型

1. symbol数据类型创建出来的值是唯一的
2. es6之后对象支持symbol数据类型作为属性名
3. Symbol.for的作用：如果全局环境中可以通过key值找到该symbol那么会将该symbol变量返回， 如果找不到会在全局环境中创建一个新的symbol变量
4. Symbol()和Symbol.for()方式创建变量的区别：Symbol() 方式创建变量不会记录在全局环境中， 也就是说我们传入相同的描述符会创建出来两个完全不同的symbol值，而Symbol.for()方式会现在全局环境中查看是否有该key值创建的symbol变量，如果有则返回该变量， 没有则创建一个symbol变量
5. 利用Symbol.for在全局环境创建symbol， 此时创建出来的symbol变量会记录在全局环境中， 可以传递一个key值，也可以利用key值创建两个相同的symbol变量
6. 可以通过Symbol.Keyfor()去获取该symbol值的key

```js
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

```





