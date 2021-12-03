const uname = 'gt'
const obj = {
  // 属性简写
  uname,
  // 方法简写
  foo() {
    console.log('foo');
  },
  // 计算属性名
  ['name' + 23]: 'xxx'
}