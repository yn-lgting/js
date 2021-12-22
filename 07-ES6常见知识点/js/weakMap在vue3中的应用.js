// 简单理解weakMap在vue3中的使用

// 1.  现在有两个对象， 当name属性改变时， 去执行一系列的方法。 思考： 如何处理属性和方法之间的映射关系

const  weakMap = new WeakMap() //  创建weakMap数据结构

const data = { name: 'test'}

// 2.往里添加我们要监听的对象例如data，值可以再是一个map数据类型的值， 而这个map数据类型里面存储着该对象属性和方法的映射关系
const map = new Map()
map.set('name', [fn1, fn2]) // 因为map数据结构不限制key的类型，所以map比较合适

weakMap.set(data, map)

// 3. 监听对象改变 Proxy Object.defineProperty()

// 4. 监听到name发生改变时，执行依赖
const fns = weakMap.get(data).get('name') // 取出weakMap中的data，再找到name对应方法遍历执行`
fns.forEach(fn => fn())

// 5. 当我们销毁data对象之后，因为是弱引用所以对应其数据结构也会被销毁