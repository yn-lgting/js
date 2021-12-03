function double(count) {
  return count * 2
}
function square(count) {
  return count ** 2
}
function square2(count) {
  return count * 3
}
// function composeFn(fn1, fn2) {
//   return function (count) {
//     return fn2(fn1(count))
//   }
// }

// let newFn = composeFn(double, square)

// console.log('result:', newFn(10))

function myCompose(...fns) {
  fns.forEach(item => {
    if (typeof item !== 'function') {
      throw new TypeError('expected arguments are functions')
    }
  })
  return (count) => {
    let result = 0
    fns.forEach((item, index) => {
      result = item.call(this, index === 0 ? count : result)
    })
    return result
  }
}

const newFn = myCompose(double, square, square2)
console.log(newFn(10))