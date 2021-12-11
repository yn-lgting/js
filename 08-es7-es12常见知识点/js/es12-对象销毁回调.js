let obj = {}
let info = {}
// 创建finalizationRegistry实例， 传入销毁时执行的回调函数
const finalization = new FinalizationRegistry((value) => {
  console.log(value, '对象被销毁了')
})
// 注册监听对象， 第二个值回作为对象被销毁时的回调的第一个参数
finalization.register(obj, 'obj')
finalization.register(info, 'info')

obj = null
info = null


