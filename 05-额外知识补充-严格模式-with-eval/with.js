var message = '123'
var obj = { message: '456' }
with(obj) {
  console.log(message) // 优先查找obj里的message
}