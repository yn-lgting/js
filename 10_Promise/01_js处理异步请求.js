function request(status, successCallback, errorCallback) {
  setTimeout(() => {
    if (status) {
      successCallback()
    } else {
      errorCallback()
    }
  }, 2000)
}
// 传入异步回  调函数
request(false, () => {
  console.log('success')
}, () => {
  console.log('error')
})