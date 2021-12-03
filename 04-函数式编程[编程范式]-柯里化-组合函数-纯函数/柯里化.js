// 普通函数
function add(num1, num2, num3) {
  return num1 + num2 + num3;
}

// 柯里化
function sum(num) {
  return function(num2) {
    return function(num3) {
      return num1 + num2 + num3;
    }
  }
}

// 利用箭头函数简写柯里化

const arrowSum = num1 => num2 => num3 => {
  return num1 + num2 + num3;
}
const arrowSum = num1 => num2 => num3 => num1 + num2 + num3;

// 柯里化demo

const log = (date) => {
  return type => {
    return message => {
      console.log(`[${date.getDate()}日 : ${date.getHours()}时] : ${type} : ${message}` )
    }
  }
}

// const newLog = log(new Date())
// newLog('新需求')('ant定制')
// newLog('新需求')('syx定制')

const newLog = log(new Date())('新BUG')
newLog('验证码BUG')
newLog('验证码BUG')
newLog('验证码BUG')


const log = (date) => {
  return type => {
    return message => {
      console.log(`[${date.getDate()}日 : ${date.getHours()}时] : ${type} : ${message}` )
    }
  }
}

function add(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}

function myCurrie2(fn) {
  const currie = (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return (...newArgs) => {
        return currie.apply(this, [...args, ...newArgs])
      }
    }
  }
  return currie
}

let newAdd = myCurrie2(add)
console.log(newAdd(10, 20, 30, 40))
console.log(newAdd(10, 20)(30, 40))
console.log(newAdd(10)(20)(30)(40))