/**
  1. 创建自由变量，存储属性要添加的依赖函数 和 存储属性与依赖之间的weakMap
 */

const weakMap = new WeakMap()
let reactiveFns = null

/**
  2. 创建Depend类，收集依赖，将要代理的对象的各个属性全部创建一个其dep对象
    * dep对象用来存储依赖， 和收集依赖与执行依赖的方法与属性
 */

class Depend{
  constructor() {
    // 存储某个属性的依赖，Set数据类型防止同一依赖被重复添加执行
    this.reactiveFns = new Set()
  }
  gatherFns() {
    typeof reactiveFns === 'function' ? this.reactiveFns.add(reactiveFns) : false
  }
  notify(target) {
    this.reactiveFns.forEach((fn) => {fn.call(target)})
  }
}

/**
 3. 如何将 对象 对象的属性及其依赖 准确的存储
    * 首先创建map数据类型，用来存储对象的属性及其依赖
    * 再将对象作为key， map数据类型作为值 存储在一个weakMap中
  * 为什么要存储在weakMap中？
    * weakMap能够限制key是一个对象， 且当这个对象不再被强引用时，这个引用会被销毁掉
 */

function getDep(target, key){ // wekeMap -> target: map | map -> property: depends
  // 1.首先从weakMap中取出map
  let map = weakMap.get(target)
  // 2. 如果没有则创建map
  if (!map){
    map = new Map()
    // 创建map, 且添加到weakMap中，key为目标对象， 值为新创建的map
    weakMap.set(target, map)
  }
  // 3. 从map中取出对应的属性依赖
  let dep = map.get(key)
  // 4. 如果没有， 则创建Depend实例，用来存储依赖
  if (!dep){
    // 创建实例
    dep = new Depend()
    // 往map中添加实例， key为对象的某个key， 值为属性依赖
    map.set(key, dep)
  }
  return dep
}

/**
 4. 封装 创建代理对象函数
  * 利用Proxy去处理监听属性变化时要收集或执行的依赖
  * 利用get捕获器去收集属性依赖
  * 利用set捕获器去执行依赖
  * 利用Reflect去存取对象里的值
 */

 function createProxy(target) {
   return new Proxy(target, {
     get(target, key, receiver) {
       // 在get捕获器去收集对应属性的依赖, 将全局下的当前依赖添加到对应依赖数组中
       const dep = getDep(target, key)
       dep.gatherFns(reactiveFns)
       return Reflect.get(target, key, receiver)
     },
     set(target, key, newValue, receiver) {
       // 在设置时，执行对应属性的依赖， 先赋值再执行依赖
       Reflect.set(target, key, newValue, receiver)
       const dep = getDep(target, key)
       dep.notify()
     }
   })
 }

/**
  5. 封住收集依赖的函数
 */
function watcherFn(fn) {
  reactiveFns = fn // 将依赖交给全局
  fn() // 执行函数，当函数中用到对象属性时， 会立马触发get捕获器， 去收集依赖
  reactiveFns = null
}


/**
 * 测试
 */
const data = {
  name: 'gt',
  age: 20
}
const info = {
  son: 1001,
  class: '一年级'
}
const proxyObject = createProxy(data)

function testFnA() {
  console.log(proxyObject.name)
}

function testFnB() {
  console.log(proxyObject.age)
}

watcherFn(testFnA)
watcherFn(testFnB)

proxyObject.name = 'new gt'
proxyObject.age = 22

const proxyObjectA = createProxy(info)

function testFnC() {
  console.log(proxyObjectA.son)
}
function testFnD() {
  console.log(proxyObjectA.class)
}

watcherFn(testFnC)
watcherFn(testFnD)

proxyObjectA.son = 1002
proxyObjectA.class = '二年级'