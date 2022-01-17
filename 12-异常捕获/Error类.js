const err = new Error('err message')
console.log(Object.getOwnPropertyDescriptors(err))
/**
 {
   stack: {
    value: 'Error: err message\n' +
      '    at Object.<anonymous> (/Users/liguanting/Documents/web/js高级/12-异常捕获/Error类.js:1:13)\n' +
      '    at Module._compile (node:internal/modules/cjs/loader:1101:14)\n' +
      '    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)\n' +
      '    at Module.load (node:internal/modules/cjs/loader:981:32)\n' +
      '    at Function.Module._load (node:internal/modules/cjs/loader:822:12)\n' +
      '    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n' +
      '    at node:internal/main/run_main_module:17:47',
    writable: true,
    enumerable: false,
    configurable: true
  },
  message: {
    value: 'err message',
    writable: true,
    enumerable: false,
    configurable: true
  }
}
 */
console.log(err.message) // err message
console.log(err.stack)
/**
 Error: err message
    at Object.<anonymous> (/Users/liguanting/Documents/web/js高级/12-异常捕获/Error类.js:1:13)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47
 */
console.log(err.name) // Error