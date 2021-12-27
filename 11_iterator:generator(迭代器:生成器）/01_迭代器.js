const ages = [1, 2, 3]
let index = 0
const obj = {
  next() {
    if (index < ages.length) {
      return { done: false, value: ages[index++]}
    }
    return { done: true, value: undefined}
  }
}

console.log(obj.next())
console.log(obj.next())
console.log(obj.next())
console.log(obj.next())

// 封装迭代器
function createIterator(arr) {
  let index = 0
  return {
    next() {
      if (index < arr.length) {
        return {done: false, value: arr[index++]}
      }
      return { done: true, value: arr[index]}
    }
  }
}

const iteratorObj = createIterator(ages)
console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())