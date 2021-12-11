const obj = {
  name: 0,
  age: 18
}

// 逻辑或赋值运算
obj.name ||= 'default value'

// 逻辑与赋值运算
const value = obj && obj.age
console.log(value)

// 空值赋值运算
console.log(obj)
obj.name ??= 'gt' // obj.name为空或undefined时 赋值 'gt'
console.log(obj.name)