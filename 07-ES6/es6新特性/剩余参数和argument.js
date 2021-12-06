// 剩余参数只展示剩余的参数， 且是一个数组
// arguments则是所有实体参数，是一个对象，类数组
function bar(a, b, ...args) {
  console.log(...args)
  console.log(arguments)
}

bar(1, 2, 3, 4)