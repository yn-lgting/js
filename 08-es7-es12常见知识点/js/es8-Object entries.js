const obj = {
  name: 'abc',
  data: {
    age: 20
  }
}
console.log(Object.entries(obj)) // 取出对象所有key value 放入一个二维数组中

const map = new Map(Object.entries(obj)) // map数据类型可以传入一个entries类型数据

console.log(map) // Map(2) { 'name' => 'abc', 'data' => { age: 20 } }