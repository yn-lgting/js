// 在字符串前方或者后方填充字符， padStart padEnd
const str = 'hello'
const filterStr = str.padStart(8, '-').padEnd(11, '*')
console.log(filterStr) // ---hello***

