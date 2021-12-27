# Iterator-Generator[迭代器与生成器]

### 1. Iterator迭代器

 * **什么是迭代器**
   * 对某个数据结构进行遍历的对象
 * js**中的迭代器**
   * 可理解为迭代器是一个对象，这个对象需要符合迭代器协议[iterator-protocol]
     * 迭代器协议定义了产生一些列值[无论是无限的还是有限]的标准方式
     * 这个标准就是一个特定的next方法
   * next方法主要有以下要求
     * 它是一个无参数或只有一个参数的函数，返回一个对象
     * 该对象必须包含两个属性
       * done[boolean]
         * 如果迭代器可以生产 序列中 的下一个值，则为false
         * 如果迭代器已将 序列迭代完毕，则为true，这种情况下value时可选的，如果他依然存在，即为迭代器结束之后的默认返回值
       * value
         * 迭代器返回的任何javascript值

```js
const ages = [1, 2, 3]
let index = 0
const obj = {
  next() {
    if (index < ages.length) {
      return { done: false, value: ages[index++]}
    }
    return { done: true, value: undefined}
  }
}

console.log(obj.next())
console.log(obj.next())
console.log(obj.next())
console.log(obj.next())

// 封装迭代器
function createIterator(arr) {
  let index = 0
  return {
    next() {
      if (index < arr.length) {
        return {done: false, value: arr[index++]}
      }
      return { done: true, value: arr[index]}
    }
  }
}

const iteratorObj = createIterator(ages)
console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())
```



### 2. Iterable可迭代对象

* **什么是可迭代对象？**
  * 一个对象实现了[iterabel protocol]协议时，他就是一个可迭代对象
  * 这个对象必须返回@@iterable方法，在代码中表现为[Symbol.iterator]是一个函数，该函数返回一个迭代器
  * 一个对象必须实现了Symbol.iterator接口，且返回一个迭代器
* **可迭代对象的应用？**
  * Array，Map, Set, arguments, NodeList集合
  * 

```js
const ageInfo = {
  ages: [1, 2, 3],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      next: () => {
        if (index < this.ages.length) return { done: false, value: [this.ages[index++]]}
        return { done: true, value: undefined}
      }
    }
  }
}

const iteratorObj = ageInfo[Symbol.iterator]()

console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())

// 有很多方法都是建立在该参数需要是一个可迭代对象上面
// 比如说for of 只能遍历可迭代对象
// const arr = [1, 2, 3]
// for (const item of arr) {
//   console.log(item)
// }
// const obj = {}
// for (const item of obj) { // 报错， obj is not iterable
//   console.log(item)
// }
// 而传入一个可迭代对象时
for (const item of ageInfo) {
  console.log(item)
}
```

* **迭代器对象的应用**

  ```js
  class Person{
   constructor(name, age, hobby){
     this.name = name
     this.age = age
     this.hobby = hobby
   }
   addHobby(hobby){
     this.hobby.push(hobby)
   }
   [Symbol.iterator]() { // 为创建对象添加迭代对象协议，返回一个迭代器
     let index = 0
     return {
       next: () => {
         if (index < this.hobby.length) return { done: false, value: this.hobby[index++]}
         return { done: true, value: undefined}
       },
       return: () => { // 当在遍历时，被break，continue，return throw 时执行的操作
         console.log('意外停止')
         return { done: true, value: undefined}
       }
     }
   }
  }
  
  const p1 = new Person('ant', 22, ['Sese'])
  p1.addHobby('not Sese')
  p1.addHobby('not Sese')
  p1.addHobby('not Sese')
  const p1Iterator = p1[Symbol.iterator]() // 获取迭代对象的迭代器
  console.log(p1Iterator.next())
  console.log(p1Iterator.next())
  console.log(p1Iterator.next())
  console.log(p1Iterator.next())
  console.log(p1Iterator.next())
  
  for(const item of p1) {
    console.log(item)
    if (item === 'not Sese') break
  }
  ```



### 3. Generator 生成器

* **生成器是es6新增的一种函数控制，使用方案，可以更灵活的去控制函数的执行**
* **生成器本质是一个函数，但是跟普通函数有一些区别：**
  * 生成器函数必须要在function关键字后加*
  * 通过yield去控制函数的执行流程
  * 返回一个生成器，每次调用生成器的next方法，都会去执行对应生成器函数yield关键字之前的代码
* **生成器函数的返回值和传参**
  * 在yield关键字可以添加此次代码执行后的返回值，返回值会作为next方法返回对象的value值
    * 生成器函数代码块最后的return 会作为最后一次next的返回值
  * 通过next参数可以为每段代码传递参数， 这个参数会作为上一个yield语句的返回值
    * 第一个yield的参数则在生成器调用时传递
* **生成器提前结束- return方法**
  * 当调用 迭代器的return方法时，后续的迭代器next方法都不会再继续执行
* **生成器抛出错误-throw方法**
  * 当调用 迭代器的throw方法时， 会给生成器函数内部抛出异常
  * 抛出异常后可以在生成器中捕获[需要捕获抛出错误的前一个yield]， 且在catch中继续yield执行
  * 捕获后，后续next方法继续执行

```js
/**
  1.创建生成器函数时，需要在function关键字后加*
  2. 生成器函数不会立即执行
  3. 生成器函数返回一个迭代器
  4. 调用迭代器的next方法执行生成器函数里的代码
  5. 生成器函数中可以通过yield关键字去表示第一段代码块，在调用函数返回的迭代器的next方法时，会执行到yield关键字
  6. 每调用一次next都会执行对应yield关键字之前的代码
 */
function* foo(params) {
  console.log('第一段代码执行', params)
  const params2 = yield 1 // 第二次next方法传递的参数，由上一个yield语句返回
  console.log('第二段代码执行', params2, params)
  try { // xxxxx ------ here
    yield 2
    console.log('第三段代码执行')
  } catch (e) {
    console.log(e)
    yield 100
  }
  yield 3
  return 4 // 代码块中最后的return 会作为最后一次迭代时返回对象的value
}

const generator = foo('first')
console.log(generator.next())
console.log(generator.next('nxx'))
console.log(generator.throw('err message')) // xxxxx ------- 第三次抛出异常，需要捕获上一次yield
console.log(generator.next())
console.log(generator.next())
```













































