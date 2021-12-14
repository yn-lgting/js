# Proxy和Reflect

## 1. Proxy基本使用

### 1. defineProperty

1. 如果想监听对象里的属性，可以借助Object.defineProperty中的存取描述符getter和setter去监听对象属性的操作
2. 但是我们直接删除或新增一个对象属性，Object.defineProperty是无法做到的
3. 其设计初衷还是给对象设置各种描述符的，而不是去监听对象的各种操作
4. 利用Object.defineProperty时，需要注意不能在存取描素符中获取或设置该对象属性， 否则会造成死循环

```js
const obj = {
  name: 'gt',
  age:18
}

/**
 * forEach中如果需要传递this, 需要使用匿名函数，箭头函数没有this
 */

Object.keys(obj).forEach(function(key) {
  let currentValue = obj[key]
  Object.defineProperty(obj, key, {
    /**
     * getter setter描述符不能再从其对象本身获取属性 或设置属性，否则会死循环
     * 一般使用闭包实用自由变量代替存取对象属性
     */
    get: function() {
      console.log('获取属性', currentValue)
      return currentValue
    },
    set: function(value) {
      console.log('设置属性', value)
      if (value === currentValue) return
      currentValue = value
    }
  })
}, obj)

obj.name = 'gt1'
console.log(obj.name)
```



### 2.Proxy

1. es6中新增Proxy类，用于创建代理对象
   * 如果需要监听一个对象的操作，先创建代理对象
   * 之后所有对该对象的操作，都通过代理对象去完成
2. 基本使用
   * 通过new Proxy(被代理对象，{捕获器}) 创建代理对象
   * 捕获器
     * get捕获器, 是一个函数 共三个参数：
       * target 被代理对象
       * property 被获取属性的key
       * recriver 调用的代理对象
     * set捕获器，是一个函数 共四个参数：
       * target 被代理对象
       * property 被设置属性的key
       * value 新属性值
       * receiver 调用的代理对象	

```js
const obj = {
  name: 'gt',
  age:18
}

/**
 * forEach中如果需要传递this, 需要使用匿名函数，箭头函数没有this
 */

Object.keys(obj).forEach(function(key) {
  let currentValue = obj[key]
  Object.defineProperty(obj, key, {
    /**
     * getter setter描述符不能再从其对象本身获取属性 或设置属性，否则会死循环
     * 一般使用闭包实用自由变量代替存取对象属性
     */
    get: function() {
      console.log('获取属性', currentValue)
      return currentValue
    },
    set: function(value) {
      console.log('设置属性', value)
      if (value === currentValue) return
      currentValue = value
    }
  })
}, obj)

obj.name = 'gt1'
console.log(obj.name)
```



* proxy所有捕获器

  ![avatar](./image/捕获器.png)

3. 监听函数对象操作

   * 函数也是对象， 可以通过apply捕获器和construct捕获器捕获。 注意：不是constructor
   * apply监听函数被调用[并非必须是apply调用]
   * construct 监听函数被new调用

   ```js
   /**
    * 函数也是一个对象，Proxy提供了 apply， constructor捕获器
    * apply 函数被调用时的捕获器
    * constructor 函数被new调用时的捕获器
    *  */ 
   
   function foo() {
     console.log('foo被调用')
   }
   
   const proxyFoo = new Proxy(foo, {
     apply: function(target, thisArg, args) { // target 函数对象， thisArg 函数中的this， args 函数的参数
       console.log('监听到函数被apply调用')
       console.log(target, thisArg, args)
       return target.apply(thisArg, thisArg, args)
     },
     construct: function(target, args, newTarget) { // target 函数对象， args 函数的参数， newTarget 代理函数对象
       console.log('监听到函数被new关键字调用')
       console.log(target, args, newTarget)
       return new target(...args)
     }
   })
   
   proxyFoo.call({name: 'gt'}, [1, 2, 3])
   new proxyFoo(1, 2)
   ```



### 3. Reflect

* Reflect是es6新增的api， 是一个对象
* Reflect提供了很多操作对象的方法，类似Object
* 为什么需要Reflect对象
  * 早期ECMA规范中没有考虑 到对对象本身的操作如何设计会更规范，直接将操作对象的API放在了Object上面
  * Object是一个构造函数， 把所有的操作全部放在Object上面可能不太合适
  * ES6新增了Reflect，希望操作对象都集中在Reflect上面
* 常见方法
  * Reflect.getPrototypeOf(target) 
  * Reflect.setPrototypeOf(target, prototype)
    * 该方法返回一个Boolean，设置成功为true反之false
  * Reflect.isExtensibel(target)
  * Reflect.preventExtensions(target)
  * Reflect.getOwnPropertyDiscription(target, key)
    * 返回该属性描述符，否则返回undefined
  * Reflect.defineProperty(target, key, {disctiptions})
    * 返回Boolean
  * Reflect.ownKeys(target)
    * 返回一个包含所有自身属性的数组[不包含继承属性]
    * 不受描述符 enumerable影响
  * Reflect.has(target, key)
    * 判断对象是否存在某个属性
  * Reflect.get(target, key, receiver)
    * 返回Boolean
  * Reflect.set(target, key, receiver)
    * 返回Boolean
  * Reflect.deleteProperty(target, key, receiver)
  * Reflect.apply(target, thisArg, args)
  * Reflect.construct(target, args, newTarget)

```js
const obj = {
  name: 'gt'
}

const proxyObj = new Proxy(obj, {
  get: function (target, key) {
    console.log('获取属性')
    return Reflect.get(target, key)
  },
  set: function(target, key, value) {
    console.log('设置属性')
    return Reflect.set(target, key, value)
  }
})

proxyObj.name = 'gtt'
console.log(proxyObj.name)

```



* receiver的作用

  * 修改getter setter的this

    ```js
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
    ```

    

* Reflect.construct

  * 类时于new关键字

  * Reflect.construct(target, args, newTarget)

    * Target 被执行的目标构造函数
    * args 被执行的构造函数的参数 是个类数组
    * newTarget 新对象的对象原型的constructor属性

    ```js
    // 通过new Person 创建一个实例， 且有name age属性， 且是Student类型
    
    function Person(name, age) {
      this.name = name
      this.age = age
    }
    
    function Student() {
    
    }
    
    /**
     * Reflect.construct(target, args, newTarget) // 类似于new操作符
     * target：被运行的构造函数
     * args：类数组，目标构造函数调用时的参数
     * newTarget：作为新对象的原型对象的constructor属性
     */
    const stu = Reflect.construct(Person, ['gt', 21], Student)
    // console.log(Object.getOwnPropertyDescriptor(Student.prototype, 'constructor'))
    console.log(stu) // Student { name: 'gt', age: 21 }
    console.log(Object.getPrototypeOf(stu) === Student.prototype) // true
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(stu))) // [constructor]
    console.log(Object.getPrototypeOf(stu).constructor === Student) // true
    ```

    