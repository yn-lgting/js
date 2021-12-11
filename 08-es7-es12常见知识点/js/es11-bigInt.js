const maxNumber = Number.MAX_SAFE_INTEGER
console.log(maxNumber) // 当js大于这个数时无法保证其正确显示

console.log(maxNumber + 2)

console.log(BigInt(maxNumber + 3)) // 数值后会加上n

console.log(BigInt(10) + BigInt(10))