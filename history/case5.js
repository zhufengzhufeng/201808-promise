let Promise = require('./promise3')
let p = Promise.reject('xxx');
// catch就是没有成功的then


// finally 最终的 无论成功还是失败都会执行的函数
Promise.prototype.finally = function (cb) {
  // 无论成功还是失败 都要执行cb 并且把成功或者失败的值向下传递
  return this.then(function (data) {
    cb();
    return data;
  },function (err) {
    cb();
    throw err;
  });
}
p.finally(function () {
  console.log('xxxx');
}).then(function (data) {
  console.log('success', data);
}, function (err) {
  console.log('error', err);
});