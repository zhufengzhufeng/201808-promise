// 1.promise需要有三个状态

function Promise(executor){
  let self = this;
  self.status = 'pending'
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  // 只有状态是pending 参能进行状态的转化
  function resolve(value) {
    if(self.status === 'pending'){
      self.value = value;
      self.status = 'fulfilled';
      self.onResolvedCallbacks.forEach(function (fn) {
        fn();
      });
    }
  }
  function reject(reason) {
    if(self.status === 'pending'){
      self.reason = reason;
      self.status = 'rejected';
      self.onRejectedCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  try{
    executor(resolve, reject); // 如果执行这个executor执行时候抛出异常 应该走下一个then的失败
  }catch(e){
    reject(e);// 出错了 reason就是错误
  }
}
// 核心方法 处理 成功或者失败执行的返回值 和promise2的关系
function resolvePromise(promise2,x,resolve,reject) {
  
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  let promise2; // 这个promise2 就是我们每次调用then后返回的新的promise
  // 实现链式调用主要的靠的就是这个promise
  promise2 = new Promise(function (resolve,reject) {
    if (self.status === 'fulfilled') {
      // 这个返回值是成功函数的执行结果
      setTimeout(() => {
        try{
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        }catch(e){
          reject(e);
        }
      }, 0);
    }
    if (self.status === 'rejected') {
      setTimeout(() => {
        try{
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        }catch(e){
          reject(e)
        }
      },0)
    }
    if (self.status === 'pending') {
      // 默认当前 new Promise  executor中是有异步的
      self.onResolvedCallbacks.push(function () {
        setTimeout(() => {
          try{
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e){
            reject(e)
          }
        }, 0);
      });
      self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try{
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e){
            reject(e);
          }
        }, 0);
     
      })
    }
  });
  return promise2;
  
}

module.exports = Promise