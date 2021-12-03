const obj = {
  uname: 'gt'
}

// 对象解构默认值

const { age: newAge = 18} = obj
console.log(newAge)

// 函数参数解构

function info({ uname }) {
  console.log(uname)
}
info(obj)