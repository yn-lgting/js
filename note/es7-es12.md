## 1. es7-es12

### 1. es8

#### 1. Object.value

* 获取对象或数组或字符串的值， 添加到一个数组中

  ```js
  const obj = {
    name: 'abc',
    data: {
      age: 20
    }
  }
  console.log(Object.entries(obj)) // 取出对象所有key value 放入一个二维数组中
  
  const map = new Map(Object.entries(obj)) // map数据类型可以传入一个entries类型数据
  
  console.log(map) // Map(2) { 'name' => 'abc', 'data' => { age: 20 } }
  ```

#### 2. Object.entries

* 将对象中的key value 放入一个数组中
* map数据类型在创建时可以直接设置entries类型的值

```js
const obj = {
  name: 'abc',
  data: {
    age: 20
  }
} 
// 取出对象所有key value 放入一个二维数组中
console.log(Object.entries(obj)) // [['name', 'abc'], ['data', {age: 20}]] 

const map = new Map(Object.entries(obj)) // map数据类型可以传入一个entries类型数据

console.log(map) // Map(2) { 'name' => 'abc', 'data' => { age: 20 } }
```



#### 3. String Padding 字符串填充

* Str.padStart(填充后长度， 要填充字符)
* Str.padEnd(填充后长度， 要填充字符)

```js
// 在字符串前方或者后方填充字符， padStart padEnd
const str = 'hello'
const filterStr = str.padStart(8, '-').padEnd(11, '*')
console.log(filterStr) // ---hello***
```

#### 4. trailing commas

* 参数后可以加逗号



## 2. es9

* async iterators 迭代器 后续讲解
* 对象展开
* Promise finally 后续讲解

## 3. es10

### 1. 数组降维 flat(降维层级)

1. 将多维数组扁平一维数组
2. flatMap将处理结果扁平化

```js
// arr.flat(降为层级) 数组降维
const arr = [1, 2, 3, [4, 5]]
console.log(arr.flat(Infinity))

// flatMap 将处理后的结果降维

const messages = ['a b', 'c, d']
const newArr = messages.flatMap(item => {
  return item.split(' ')
})
console.log(newArr) // ['a', 'b', 'c', 'd']

const newArr2 = messages.map(item => {
  return item.split(' ')
})

console.log(newArr2) // [ [ 'a', 'b' ], [ 'c,', 'd' ] ]
```



### 2. Object.fromEntries

1. 将entries类型数据转为对象
   * 可以利用URLSearchParams将查询字符串转化为entries类型，在利用Object.fromEntries转化为对象

```js
const obj = {
  name: 'gt',
  age: 18
}

const entriesObj = Object.entries(obj)
console.log(entriesObj)

// 将entries类型转化为对象
const newObj = Object.fromEntries(entriesObj)
console.log(newObj)

// 使用场景
const url = 'https://baodu.com?name=gt&age=28&hight=1.88'

const queryString  = url.split('?')[1] // 拿到查询字符串
console.log(queryString)
const entriesStr = new URLSearchParams(queryString) // 利用URLSearchParams获取到entries类型
console.log(entriesStr)
const params = Object.fromEntries(entriesStr) // 将entries类型转化为对象
console.log(params)
```

### 3. tirmStart trimEnd

1. 去除字符串前面或者后面的空格

### 4. 其他知识

1. Symbol.description
2. Optional catch binding； try catch内容后续补充



## 3.es11

### 1. BigInt

1. js可能无法正确表示最大安全数以外的数字，需要用到BigInt去转换
2. BigInt转换后的值最后会有个n
3. 目前Number类型无法直接和BigInt类型相加
4. 最大安全数： Number.MAX_SAFE_INTEGER
5. BigInt(10) + BigInt(10) = 20n

### 2. Nullish-coalescing-operator 空值运算符

```js
let a = ''
let b = a || 'default value' // 由于逻辑货无法正确判断空字符串 0，因为会被隐式转换成false
console.log(b) // default value

let c = a ?? 'default value'
console.log(c) // '' 当空值运算符前面的值为undefined或者null时， 才会走下面的逻辑
```



### 3. optionalChailing 可选链

```js
const obj = {
  name: 'gt',
}
// optionalChaining 可选链
if(obj?.data?.code) {
  console.log(obj.data.code)
}

// es11之前
if (obj.data && obj.data.code) {
  console.log(obj.data.code)
}

```



### 4. 在node或window对象下获取全局对象

```js
// window
 console.log(globalThis) // window
 console.log(this) // window
// node
 console.log(this) // 该js模块
 console.log(globalThis) // 全局对象
```



## 4. es12

### 1. FinalizationRegistry 监听对象被销毁

```js
let obj = {}
let info = {}
// 创建finalizationRegistry实例， 传入销毁时执行的回调函数
const finalization = new FinalizationRegistry((value) => {
  console.log(value, '对象被销毁了')
})
// 注册监听对象， 第二个值回作为对象被销毁时的回调的第一个参数
finalization.register(obj, 'obj')
finalization.register(info, 'info')

obj = null
info = null

```

### 2. wekRef

1. 创建弱引用对象

   ```js
   let obj = {
     name: 'gt'
   }
   const finalization = new FinalizationRegistry(() => {
     console.log('对象被销毁了')
   })
   
   finalization.register(obj)
   
   const info = new WeakRef(obj) // 创建一个弱引用
   
   console.log(info) // weakRef{}
   
   obj = null
   
   console.log(info.deref().name) // 不能直接重弱引用对象中获取属性， 必须通过deref去获取该对象里的属性
   
   setTimeout(() => {
     // 如果obj被销毁了， 再打印info对象就是一个undefined， 可见info只是一个弱引用
     // console.log(info.deref().name) // 报错
     // 可以通过可选链防止代码出错
     console.log(info?.deref()?.name) // obj销毁后打印undefined
   }, 10000)
   ```



### 3. 逻辑赋值

```js
const obj = {
  name: 0,
  age: 18
}

// 逻辑或赋值运算
obj.name ||= 'default value'
console.log(obj.name) // default value
// 逻辑与赋值运算
const value = obj && obj.age
console.log(value) // 18

// 空值赋值运算
console.log(obj)
obj.name ??= 'gt' // obj.name为空或undefined时 赋值 'gt'
```



