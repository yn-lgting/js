const obj = {
  name: 'gt'
}

console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
console.log(Object.getOwnPropertyDescriptors(obj, 'name'))