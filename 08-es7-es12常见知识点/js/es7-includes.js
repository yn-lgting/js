// 判断是否包含某个元素

const arr = ['abc', 'cba', 'nba', NaN]

// es6之前
console.log(arr.indexOf('abc') === -1) // false为包含
console.log(arr.indexOf(NaN) === -1) // true 是无法正常判断是否包含NaN的

// es6之后 
console.log(arr.includes('abc'))
console.log(arr.includes(NaN))