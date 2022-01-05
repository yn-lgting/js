function* generator(params){
  console.log('第一段代码执行', params)
  const params1 = yield 'result'
  console.log('第二段代码执行', params1)
  yield 'result2'
  console.log('第三段代码执行')
  return 'result3'
}

const iteratorObj = generator('params1')
console.log(iteratorObj.next())
console.log(iteratorObj.next('params2'))
console.log(iteratorObj.next())