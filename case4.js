let Promise = require('./promise3');
// 如何是实现一个defer方法
let fs = require('fs');
function read(url) {
  // q  angularjs 1.0
  let defer = Promise.defer(); // 语法糖
  fs.readFile(url,'utf8',function (err,data) {
    if (err) defer.reject(err);
    defer.resolve(data);
  });
  return defer.promise;
  // return new Promise(function(resolve,reject) {
  //   fs.readFile(url,'utf8',function (err,data) {
  //     if(err) reject(err);
  //     resolve(data);
  //   })
  // })
}
read('./name.txt').then(function (data) {
  console.log(data);
})