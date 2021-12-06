function foo(str, variable1, variable2) {
  console.log(str, variable1, variable2);
}

const variable = 'gt'
const variable2 = '18'

/**
 * 标签模版字符串
 * 通过``调用函数，函数对一个参数为模版字符串中表达式所分割的字符串所组成的数组
 * 后面的参数为模版字符串的表达式
 */
foo`字符1-${variable}-字符2-${variable2}`