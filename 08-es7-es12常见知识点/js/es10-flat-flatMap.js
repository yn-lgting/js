// arr.flat(降为层级) 数组降维
const arr = [1, 2, 3, [4, 5, [6, 7]]]
console.log(arr.flat(Infinity))

// flatMap 将处理后的结果降维

// const messages = ['a b', 'c, d']
// const newArr = messages.flatMap(item => {
//   return item.split(' ')
// })
// console.log(newArr) // ['a', 'b', 'c', 'd']

// const newArr2 = messages.map(item => {
//   return item.split(' ')
// })

// console.log(newArr2) // [ [ 'a', 'b' ], [ 'c', 'd' ] ]

function flat(arr) {
  let newArr = []
  function foo(arr) {
    for(const item of arr) {
      Array.isArray(item) ? foo(item) : newArr.push(item)
    }
  }
  foo(arr)
  return newArr
}

const newArr3 = flat(arr)
console.log(newArr3)