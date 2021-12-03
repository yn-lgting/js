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
