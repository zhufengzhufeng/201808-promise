// 1.promise需要有三个状态

function Promise(executor){
  let self = this;
  self.status = 'pending'
  self.value = undefined;
  self.reason = undefined;
  // 只有状态是pending 参能进行状态的转化
  function resolve(value) {
    if(self.status === 'pending'){
      self.value = value;
      self.status = 'fulfilled';
    }
  }
  function reject(reason) {
    if(self.status === 'pending'){
      self.reason = reason;
      self.status = 'rejected';
    }
  }
  try{
    executor(resolve, reject); // 如果执行这个executor执行时候抛出异常 应该走下一个then的失败
  }catch(e){
    reject(e);// 出错了 reason就是错误
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  if (self.status === 'fulfilled'){
    onFulfilled(self.value);
  }
  if (self.status === 'rejected'){
    onRejected(self.reason);
  }
}

module.exports = Promise