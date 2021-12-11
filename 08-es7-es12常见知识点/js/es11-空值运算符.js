let a = ''
let b = a || 'default value' // 由于逻辑货无法正确判断空字符串 0，因为会被隐式转换成false
console.log(b) // default value

let c = a ?? 'default value'
console.log(c) // '' 当空值运算符前面的值为undefined或者null时， 才会走下面的逻辑