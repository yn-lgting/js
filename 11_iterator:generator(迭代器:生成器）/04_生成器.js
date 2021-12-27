/**
  1.创建生成器函数时，需要在function关键字后加*
  2. 生成器函数不会立即执行
  3. 生成器函数返回一个迭代器
  4. 调用迭代器的next方法执行生成器函数里的代码
  5. 生成器函数中可以通过yield关键字去表示第一段代码块，在调用函数返回的迭代器的next方法时，会执行到yield关键字
  6. 每调用一次next都会执行对应yield关键字之前的代码
 */
function* foo(params) {
  console.log('第一段代码执行', params)
  const params2 = yield 1
  console.log('第二段代码执行', params2, params)
  try { // xxxxx ------ here
    yield 2
    console.log('第三段代码执行')
  } catch (e) {
    console.log(e)
    yield 100
  }
  yield 3
  return 4 // 代码块中最后的return 会作为最后一次迭代时返回对象的value
}

const generator = foo('first')
console.log(generator.next())
console.log(generator.next('nxx'))
console.log(generator.throw('err message')) // xxxxx ------- 第三次抛出异常，需要捕获上一次yield
console.log(generator.next())
console.log(generator.next())