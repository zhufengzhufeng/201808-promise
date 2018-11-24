

let Promise = require('./promise3');
let p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject('xx')
  }, 0);
})
// promise 中 每次调用then 都应该返回一个新的promise 
// promise的实例只能成功或者失败  不能既成功又失败

// 如果then方法返回了一个promise ，
// 当前返回的这个promise2 应该等待这个promise执行结果再继续

p.then(null,function (err) {
  throw err;
}).then(null,function (err) {
  throw err;
}).then(null,function (err) {
  console.log('err',err);
})



let promise2 = p.then(function (data) {
  return new Promise((resolve,reject)=>{
    resolve(new Promise(function (resolve,reject) {
      setTimeout(() => {
        resolve(10000);
      }, 1000);
    }));
  })
})

