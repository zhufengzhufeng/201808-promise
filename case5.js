//let Promise = require('./promise3')
let p = Promise.resolve('xxx');
// catch就是没有成功的then


// finally 最终的 无论成功还是失败都会执行的函数

p.finally(function(){
  console.log('xxxx')
}).then(function (data) {
  console.log('success',data);
},function (err) {
  console.log('error',err);
})