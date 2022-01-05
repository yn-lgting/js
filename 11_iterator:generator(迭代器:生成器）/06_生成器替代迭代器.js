// 生成器每调用一次，都会返回一个类似迭代器返回的对象
const arr = [1, 2, 3]
function* createIterator(arr) {
  for(const item of arr) {
    yield item
  }
}

// const arrIterator = createIterator(arr)
// console.log(arrIterator.next())
// console.log(arrIterator.next())
// console.log(arrIterator.next())


/**
 yield*
 后加可迭代对象, 可自动迭代可迭代对象
 */
function* createIterator1(arr) {
  yield* arr
}

const arrIterator = createIterator1(arr)
console.log(arrIterator.next())
console.log(arrIterator.next())
console.log(arrIterator.next())
console.log(arrIterator.next())