// 这里var声明的变量类似于在全局申明的变量， 当执行到打印那一行代码时i已经变成9了
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 20)
}

// let跟const都有自己的块级作用域， 所以能够打印出1-9
for(let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 20)
}