// weakSet与Set区别
/**
 * 1. weakSet内部只能存储对象
 */

// 弱引用和强引用 [strong reference / weak reference]
/**
 * 1. 当对象被强引用时，垃圾回收机制GC是不会回收该对象的，而弱引用是会被垃圾回收机制回收掉的
 */

const obj = {
}

const weakSet = new WeakSet();
weakSet.add(obj)
console.log(weakSet);