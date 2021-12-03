class MyArray extends Array {
  firstItem() {
    return this[0]
  }
  lastItem() {
    return this[this.length - 1]
  }
}

const arr = new MyArray(1, 2, 3)
console.log(arr.firstItem()) // result: 1
console.log(arr.lastItem()) // result: 3