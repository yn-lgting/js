let obj = {
  name: 'gt'
}
const finalization = new FinalizationRegistry(() => {
  console.log('对象被销毁了')
})

finalization.register(obj)

const info = new WeakRef(obj) // 创建一个弱引用

console.log(info) // weakRef{}

obj = null

console.log(info.deref().name) // 不能直接重弱引用对象中获取属性， 必须通过deref去获取该对象里的属性

setTimeout(() => {
  // 如果obj被销毁了， 再打印info对象就是一个undefined， 可见info只是一个弱引用
  // console.log(info.deref().name) // 报错
  // 可以通过可选链防止代码出错
  console.log(info?.deref()?.name) // obj销毁后打印undefined
}, 10000)