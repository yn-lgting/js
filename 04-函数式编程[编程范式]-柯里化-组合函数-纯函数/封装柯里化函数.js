// function createCurrie(fn) {
//   const currie = (...args) => {
//     if (args.length >= fn.length) { // 传入参数个数和所需相等, 执行函数
//       return fn.apply(this, args); // 兼容外部利用call等方法去调用时的情况
//     } else { // 传入参数小于所需参数长度, 返回新函数
//       return (...newArgs) => { 
//         return currie.apply(this, [...args, ...newArgs]); // 返回的函数递归调用currie函数判断参数个数是否满足
//       }
//     }
//   }
//   return currie;
// }

function add(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
const newAdd = createCurrie(add)
console.log(newAdd(10, 20, 30, 40))
console.log(newAdd(10, 20)(30)(40))
console.log(newAdd(10)(20)(30)(40))

/**
 * 执行顺序
 * 1. createCurrie接受一个函数, 不做任何处理, 且返回一个接受参数的函数
 * 2. 此时外界调传入函数时, 得到的新函数即相当于调用currie函数, 而currie函数接受参数后, 先判断传入的参数个数是否大于目标函数的长度
 * 3. 大于则直接执行函数, 如果小于, 则返回一个新的函数且接受参数, 而此函数调用后内部递归调用currie函数, 去判断形参个数即可
 */

function createCurrie(fn) {
  const currie = (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(fn, args);
    } else {
      return (...newArgs) => {
        return currie.apply(this, [...args, ...newArgs]);
      }
    }
  }
  return currie
}
function add(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
let newAdd = createCurrie(add)
console.log(newAdd(10, 20, 30, 40))
console.log(newAdd(10, 20)(30, 40))

const log = (date) => {
  return type => {
    return message => {
      console.log(`[${date.getDate()}日 : ${date.getHours()}时] : ${type} : ${message}` )
    }
  }
}
const newLog = createCurrie(log)(new Date())

newLog('需求')('ant定制')
