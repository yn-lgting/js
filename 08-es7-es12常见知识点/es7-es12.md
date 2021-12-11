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



