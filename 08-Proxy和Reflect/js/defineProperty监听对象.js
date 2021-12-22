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
    },
  })
}, obj)

obj.name = 'gt1'
console.log(obj.name)