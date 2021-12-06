var foo = 1
if (true) {
  // 在let/const声明的代码块里，不能提前访问该变量。称为暂时性死区
  console.log(foo)
  let foo = 3
}

const arr  = [1, 2, 3]
for(const item of arr) {
  console.log(item)
}