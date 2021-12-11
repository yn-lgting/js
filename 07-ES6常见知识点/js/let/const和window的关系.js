// 1. let和const是不会在window上添加任何属性的
// 2. 在之前ecma规范中， var声明的变量，是会添加到执行上下文中的VO 所指向GO/AO中， 当前最新的ecma规范已经剔除了VO的概念，
// 3. 新添加了VE（variable environment）的概念， 叫做变量环境，上下文中的变量和函数会作为环境记录（environment record）保存在变量环境中（函数的参数也会作为环境记录添加到变量环境中）
// 4. window在早期是和VO的地址是一样的，但是后来ecma规范了VE，也就是说window不再和GO是一个对象了， window对象是跟浏览器有关系的，为了适配，当我们用var声明变量时，会同步将GO中所添加的变量添加到window对象中， 而es6提出的let/const则不会被添加进去

/**
 * 总结
 1. 综上所述，声明的变量会被作为环境记录添加到变量环境中
 2. 没有规范定义GO就是window对象，每个js引擎都会有自己GO的实现 ·
 3. v8中其实是通过variableMap的一个hashmap（哈希表） 来实现他们的存储
 4. 对于window对象早起而言，他就是GO， 在最新实现中其实是浏览器自身添加的全局对象，并且为了适配，保留了var关键字对window对象的影响
 */