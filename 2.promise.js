// 为什么需要promise
// 1) 回调地狱 如果多个异步请求 有连带关系 回调嵌套
// 2) 多个异步实现并发的话 会出现无法同步异步的返回结果
// 3) 错误处理不方便

// 什么是promise 承诺 
// promise 有三个状态 同意 成功态 Resolved  失败态 Rejected  等待态 Pending
// 默认情况是pending  - > resolved
//          pending  - > rejectd
//          resolved 能不能和 rejected 相互转化

// 用法： promise 在ie 下是不兼容的 
// new Promise的时候 需要传递一个 executor 执行器 ，执行器函数会默认被内部所指向
setTimeout(function () {
  console.log('setTimeout')
}, 0);
let p =  new Promise(function (resolve,reject) {
  // 如果在这里调用了resolve 就会变成成功态
  // 同时调用resolve 和reject 只会执行一个
  reject();
  resolve();
});
// 每个promise(实例) 都拥有一个then方法
// then方法是一个异步方法,默认不会再当前的上下文中执行 setTimeout
// 再异步编程中 会给异步方法 编造两个序号 宏任务 setTimeout 微任务 then
p.then(function () { // 成功
  console.log('成功')
},function () { // 失败
  console.log('失败')
});
console.log('xxxx');






