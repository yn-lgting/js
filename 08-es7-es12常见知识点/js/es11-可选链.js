const obj = {
  name: 'gt',
}
// optionalChaining 可选链
if(obj?.data?.code) {
  console.log(obj.data.code)
}

// es11之前
if (obj.data && obj.data.code) {
  console.log(obj.data.code)
}
