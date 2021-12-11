# class

## 1. calss

1. calss是es6新增的关键字， 用于创建一个类
2. 本质上依然是一个构造函数

## 2. 类的基本使用

### 2.1 创建类

```js
class Person {
}

const Person = class {
}
```

### 2.2 类和构造函数的异同

1. 类的原型关系与构造函数一致

   ```js
   class Person {
   
   }
   
   const p1 = new Person()
   
   console.log(Person.prototype.__proto__ === Object.prototype) // 类的prototype依旧是Object的实例
   console.log(Person.prototype.constructor) // 类的prototype中依旧有constructor属性， 其指向类本身
   console.log(Person.__proto__ === Function.prototype) // 类本身跟构造函数一样， 是有__proto__的， 且只想Function.prototype，可以说其是Function的一个实例
   
   console.log(p1.__proto__ === Person.prototype) // true
   ```

#### 2.3 类的构造函数[constructor]

##### 2.3.1 constructor说明

1. 所有类都有自己的constructor方法
2. 通过new关键字去调用一个类时， 回去调用其内部的constructor
3. 每个类只能有一个constructor方法
4. 通过constructor去传递参数

##### 2.3.2 new关键字操作类的过程

1. 调用constructor方法
2. 其方法会在内存中创建一个对象
3. 其this会指向这个对象
4. 将新对象的隐式属性指向类的prototype
5. 如果没有返回非空对象， 则返回这个新对象

##### 2.3.3 传递参数-定义方法

1. 在类中的constructor中定义属性

2. 直接在类中可定义实例的共享方法

3. 使用static关键字可以定义类本身的方法， 只能通过类调用

   ```js
   class Person {
     // 类通过constructor来定义属性
     constructor(name, age) {
       this.name = name
       this.age = age
       this._address = '北京市'
     }
     // 共享方法直接定义在类中
     run() {
       console.log(this.name, 'run')
     }
     eat() {
       console.log(this.name, 'eat')
     }
     // 设置get set方法
     get address() {
       return this._address
     }
     set address(address) {
       this._address = address
     }
     // 定义类本身的方法， 只能通过类和其派生类调用
     static provate() {
       console.log('私有方法')
       const name = ['gt', 'am']
       const randomName = name[Math.floor(Math.random() * name.length)]
       const randomAge = Math.floor(Math.random() * 100)
       return new Person(randomName, randomAge)
     }
   }
   
   const p1 = new Person('gt', 18)
   console.log(p1)
   console.log(p1.address)
   p1.run()
   const p2 = Person.provate()
   console.log(p2)
   
   ```

##### 2.3.4  super关键字子类操作符类方法

1. super关键子可以让子类调用其父类中符方法和传递属性参数

2. 在**子类constructor中如果需要操作this， 必须先调用super关键字将其this传递下来**， 否则会报错

3. super关键字在**以函数的方式调用时， 会创建this**，也可以说是一个实例对象， 并将其派发给派生类使用

4. super关键字在**以属性方式调用时， 可以调用基类中的方法，包括静态方法**（静态方法只能由基类和其派生类调用）

5. 父类中封装公共方法， 可通过子类**重写**父类中的方法（不是真正重写父类上的方法， 而是在**子类实例自身添加方法**，这样在原项链中就不会再往上查找）

   ```js
   class Person{
     constructor(name, age) {
       this.name = name
       this.age = age
     }
     static parentMethod() {
       console.log('parent Method')
     }
     run() {
       console.log(this.name, 'run1')
     }
   }
   
   class Student extends Person {
     constructor(sno) {
       super(...arguments) // 通过super关键字调用传递给父类属性参数
       this.sno = sno
     }
     run() { // 子类重写父类方法
       super.run() // 子类可以通过super关键字调用父类原型上的方法
       console.log('student', this.name, 'run2')
     }
     static parentMethod() { // 也可以修改其父类的静态方法【只能由其本身或子类本身调用】
       super.parentMethod() // 可以通过super关键字调用父类方法
       console.log('update parent method')
     }
   }
   
   const s1 = new Student('gt', 18, 1001)
   console.log(s1)
   s1.run()
   Student.parentMethod() // 子类调用父类静态方法，只能通过子类和父类本身调用
   ```



#### 2.3.5 class babel转es5源码阅读

1. class转es5

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age
  }
  run() {
    console.log(this.name, 'run')
  }
}
const p1 = new Person()
"use strict";

function _classCallCheck(instance, Constructor) {
  /**
   * instance -> this  Constructor -> 类
   * 判断在使用类时，是否是通过new关键字调用的， 如果是， 类的prototype会出现在this的原项链上面， 取反则是函数调用
   * 如果不是，抛出错误 Cannot call a class as a function[不能将类当作函数调用]
   */
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  // 遍历描述符对象
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    // 设置是否可枚举
    descriptor.enumerable = descriptor.enumerable || false;
    // 设置是否可删除和后续修改描述符
    descriptor.configurable = true;
    // 判断是否有值, 如果有可修改设置为true
    if ("value" in descriptor) descriptor.writable = true;
    console.log(target, descriptor.key, descriptor)
    // 在类的原型上面添加该属性及其描述符， defineProperty（Person.prototype, run, {
    // configurable： true
    // enumerable： false
    // value： [Function run]
    // writable: true
    // }）
    Object.defineProperty(target, descriptor.key, descriptor);

    console.log(Object.getOwnPropertyDescriptors(target))
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  // 判断是否传入描述符，
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  // 判断是否传入静态描述符
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/**
 * /*#__PURE__*\/ 表示这是一个纯函数
 * 在构建工具压缩代码时【webpack】，会进行tree-shaking 【摇树】
 * tree-shaking 会讲没有调用的函数的代码块移除， 减少代码打包体积
 */
var Person = /*#__PURE__*/ (function () {
  // 创建一个自执行函数， 返回Person构造函数
  function Person(name, age) {
    // 校验是否以new的形式调用
    _classCallCheck(this, Person);
    this.name = name;
    this.age = age;
  }
 // 添加子类公用方法 传递Person类和描述符
  _createClass(Person, [
    {
      key: "run",
      value: function run() {
        console.log(this.name, "run");
      }
    }
  ]);

  return Person;
})();

```



2. es6继承转es5代码阅读





#### 2.3.6 继承内置类

1. js中可以继承内置类

```js
class MyArray extends Array { // 继承原生Array类
  firstItem() { // 添加自己的方法
    return this[0]
  }
  lastItem() {
    return this[this.length - 1]
  }
}

const arr = new MyArray(1, 2, 3)
console.log(arr.firstItem()) // 1
console.log(arr.lastItem()) // 3
```





#### 2.3.7 js多态定义

1. 定义
   * 维基百科： 多态[ploymorphism] 指为不同数据类型的实体提供统一的借口， 或是用一个单一的符号来表示不同的类型
   * 个人总结：不同数据类型进行同一个操作， 表现出不同的行为，就是多态的体现。js本就是弱类型语言，一切皆对象，在一个+左右放置不同类型的值， 得到的结果也是不一样的，【数字相加， 字符拼接】，



#### 2.3.8 混入minxin

1. 核心思想： 创建一个新的类，继承至想要混入的类
2. 让新创建的类的隐式原型指向混入类的现实原型

```js
class Person{
  eat() {
    console.log('eat')
  }
}

class Student extends Person {

}

function minxinClass(superClass) {
  // 创建一个新的类， 继承至需要混入的类
  return class extends superClass {
    run() {
      console.log('run')
    }
  }
}

const NewClass = minxinClass(Student)

const newC = new  NewClass()
newC.eat()



```

























