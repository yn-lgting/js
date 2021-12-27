class Person{
 constructor(name, age, hobby){
   this.name = name
   this.age = age
   this.hobby = hobby
 }
 addHobby(hobby){
   this.hobby.push(hobby)
 }
 [Symbol.iterator]() {
   let index = 0
   return {
     next: () => {
       if (index < this.hobby.length) return { done: false, value: this.hobby[index++]}
       return { done: true, value: undefined}
     },
     return: () => { // 当遍历时，被终止了执行的函数，例如break, continue, return, throw new Error
       console.log('意外停止')
       return { done: true, value: undefined}
     }
   }
 }
}

const p1 = new Person('ant', 22, ['Sese'])
p1.addHobby('not Sese')
p1.addHobby('not Sese')
p1.addHobby('not Sese')
const p1Iterator = p1[Symbol.iterator]() // 获取迭代对象的迭代器
console.log(p1Iterator.next())
console.log(p1Iterator.next())
console.log(p1Iterator.next())
console.log(p1Iterator.next())
console.log(p1Iterator.next())

for(const item of p1) {
  console.log(item)
  if (item === 'not Sese') break
}