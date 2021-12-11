const obj = {
  name: 'gt',
  age: 18
}

const entriesObj = Object.entries(obj)
console.log(entriesObj)

// 将entries类型转化为对象
const newObj = Object.fromEntries(entriesObj)
console.log(newObj)

// 使用场景
const url = 'https://baodu.com?name=gt&age=28&hight=1.88'

const queryString  = url.split('?')[1] // 拿到查询字符串
console.log(queryString)
const entriesStr = new URLSearchParams(queryString) // 利用URLSearchParams获取到entries类型
console.log(entriesStr)
const params = Object.fromEntries(entriesStr) // 将entries类型转化为对象
console.log(params)