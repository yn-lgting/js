// Promise.resolve().then(() => {
//   console.log('a')
//   // return 'b' // return 一个普通的值，直接推入微任务中
//   // return { // return 一个thenable接口，下一轮推入微任务
//   //   then(resolve) {
//     //     resolve('b')
//     //   }
//     // }
//   return Promise.resolve('b') // return 一个Promise,不是一个普通的值，下一轮推入，Promise.resolve() 在推入微任务中
// }).then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log('c')
//   return 'd'
// }).then((res) => {
//   console.log(res)
//   return {
//     then(resolve) {
//       resolve('f')
//     }
//   }
// }).then(() => {
//   console.log('e')
// })


// const promise = new Promise((resolve, reject) => {
//   // resolve('1')
//   return resolve(Promise.resolve(1))
// })

// promise.then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log(2)
// }).then(() => {
//   console.log(3)
// }).then(() => {
//   console.log(4)
// })


// Promise.resolve().then(() => {
//   console.log("then1");
//   Promise.resolve().then(() => {
//     console.log("then1-1");
//     return 1;
//   }).then(() => {
//     console.log("then1-2");
//   });
// }).then(() => {
//   console.log("then2");
// }).then(() => {
//   console.log("then3");
// }).then(() => {
//   console.log("then4");
// });d


Promise.resolve().then(() => { 
  console.log("then1"); // 1. 打印then1
  Promise.resolve().then(() => { // 2. Promise.resolve同步执行。将该then推入微任务队列
    console.log("then1-1"); // 4. 打印 then1-1
    return Promise.resolve(); // 5. 产生NewPromiseResolveThenableJob[超出知识范围]，暂时理解成一个微任务。不执行js代码 ｜ 8.执行NewPromise ResolveThenableJob[运行时会再次产生微任务] ｜ 11.执行NewPro...后拿到Promise.resolve返回的成功状态的Promise
  }).then(() => { // 12. 将该then推入微任务队列
    console.log("then1-2"); // 14. 打印then1-2
  });
}).then(() => { // 3. 将该then推入微任务队列
  console.log("then2");// 6. 打印then2
}).then(() => {// 7. 该then推入微任务队列
  console.log("then3"); // 9. 打印then3啊
}).then(() => { // 10. 将该then推入微任务队列
  console.log("then4"); // 13. 打印then4
});