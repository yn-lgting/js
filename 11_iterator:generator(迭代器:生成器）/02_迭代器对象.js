const ageInfo = {
  ages: [1, 2, 3],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      next: () => {
        if (index < this.ages.length) return { done: false, value: this.ages[index++]}
        return { done: true, value: undefined}
      }
    }
  }
}

const iteratorObj = ageInfo[Symbol.iterator]()

console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())
console.log(iteratorObj.next())

// 有很多方法都是建立在该参数需要是一个可迭代对象上面
// 比如说for of 只能遍历可迭代对象
// const arr = [1, 2, 3]
// for (const item of arr) {
//   console.log(item)
// }
// const obj = {}
// for (const item of obj) { // 报错， obj is not iterable
//   console.log(item)
// }
// 而传入一个可迭代对象时
for (const item of ageInfo) {
  console.log(item)
}