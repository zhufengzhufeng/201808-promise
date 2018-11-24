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
  // 这个处理函数 需要处理的逻辑韩式很复杂的
  // 有可能这个x 是一个promise  但是这个promise并不是我自己的
  if(promise2 === x){
   return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  // 不单单需要考虑自己 还要考虑 有可能是别人的promise
  let called; // 文档要求 一旦成功了 不能调用失败
  if((x!=null&&typeof x=== 'object') || typeof x === 'function'){
    // 这样只能说 x 可能是一个promise
    try{
      // x = {then:function(){}}
      let then = x.then; // 取then方法
      if(typeof then === 'function'){
        then.call(x,function (y) { // resolve(new Promise)
          if(!called){
            called = true;
          } else{
            return;
          }
          resolvePromise(promise2,y,resolve,reject); //  递归检查promise
        },function (r) {
          if (!called) {
            called = true;
          } else {
            return;
          }
          reject(r);
        });
      }else{ // then方法不存在
        resolve(x); // 普通值
      }
    }catch(e){ // 如果取then方法出错了，就走失败
      if (!called) {
        called = true;
      } else {
        return;
      }
      reject(e);
    }
  }else{
    resolve(x);
  }
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
          // 判断promise2 和 x 也是then函数返回的结果和promise2的关系 如果x 是普通值 那就让promise2成功 如果 是一个失败的promise那就让promise2 失败
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