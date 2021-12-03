const obj = {}; // 相当于 const obj = new Object();

console.log(Object.prototype) // 无可枚举属性, 存储着对象方法等

console.log(Object.prototype.__proto__) // 顶级对象的隐式原型为null

console.log(obj.__proto__ === Object.prototype.__proto__); // true