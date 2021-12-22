#### with语句
1. with语句接收一个对象, 其代码块会优先查找改对象里面的属性, 如果没有, 再按照作用域链查找
```js
var message = '123'
var obj = { message: '456' }
with(obj) {
  console.log(message) // 优先查找obj里的message
}
```
2. 不推荐使用, 再use strict(严格模式) 下, 不允许使用with语句

#### eval
1. 可执行一段js字符串
2. 不建议开发使用, 不安全, 字符串可能被篡改, 可阅读性差, 
3. eval需要js解释器解析再运行, 不能被js引擎优化
```js
var jsStr = 'var message = "eval message"; console.log(message);'
eval(jsStr)
```

#### 严格模式 use strict
* **认识**
1. es5提出的概念, 具有限制性的js模式, 让代码脱离懒散模式
2. 浏览器执行代码时, 发现js开启了use strict时, 会进行严格和检查
* **严格模式对正常的js语义进行了限制**
1. 严格模式会抛出原有的不会抛出的静默错误
2. 严格模式会让js1引擎在执行代码时进行更多优化(不需要对特殊语法进行处理)
3. 禁用ECMAscript未来版本中可能会定义的语法
* **开启严格模式**
1. js开启严格模式
  * use strict
2. 粒度化: 函数开启严格模式
  * 函数代码块第一行 use strict
* **严格模式下的错误**
1. 不允许创建意外变量
2. 不允许使用8进制
3. 不允许使用with语句等等
4. 严格模式下自执行函数不会指向window， 而是undefined
5. 严格模式下setTimeout内部的this也是指向window的
