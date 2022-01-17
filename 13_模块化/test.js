const info = {
  a: 1,
  b: 2
}
// 可以通过exports或者module.exports导出
// module.exports = info
// 如果同时写了两个导出方式，则以module.exports为准
// exports.info = info
// 最终导出的数据结构是以module.exports为主，比如说如果给exports直接赋值一个对象，是无法导出的
exports = info