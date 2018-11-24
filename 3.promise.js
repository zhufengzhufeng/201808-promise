// 链式调用的问题
// let p = new Promise(function (resolve,reject) {
//   setTimeout(() => {
//     reject('没钱');
//   }, 1000);
// });
// p.then(function (value) {
//     console.log(value)
// },function (reason) {
//     console.log('error',reason)
// });
let fs = require('fs');
function read(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    })
  });
}
// 体现promise的链式调用
// promise 每次调用then后 返回一个新的promise
// read('./name.txt').then(function (data) {
//   // then方法成功后 返回的是一个新的promise,这个返回的promise会被执行，如果返回的promise是成功的，会把这个结果传递到外层的下一个then中
//   return read(data)
// },function (err) {
//   console.log(1,err);
// }).then(function (data) {
//   console.log('age',data)
// },function (err) {
//   console.log(2,err);
// })

// 如果返回的是promise 用promise的成功或者失败 执行下一个then
// 如果返回的是一个普通值 会走外层下一个then的成功
// 如果执行的时候 抛出异常就会走到下一个次then中的失败
// then中可以不传递参数，如果不传递 会透到下一个then中
// read('./name.txt').then(function (data) {
//   throw new Error();
// }).then(function (data) {
//   console.log('age', data)
// }).then().then(null, function (err) {
//   console.log('then', err)
// }).catch(function (err) {
//   console.log('error', err);
// }).then(function (data) {
//   console.log(data);
// })

// Promise提供了一个 并发的方法 Promise.all 实现并发执行promise,all方法返回的结果是一个promise
// Promise.all([read('./name.txt1'), read('./age.txt')]).then(function (data) {
//   console.log(data); 
// }).catch(function (err) {
//   console.log(err);
// });
Promise.race([read('./name.txt'), read('./age.txt')]).then(function (data) {
  console.log(data);
}).catch(function (err) {
  console.log(err);
});
// new Promise(function (resolve, reject) {
//   resolve(1);
// })
// .then(function (x) {
//   return x+1;
// })
// .then(function (x) {
//   throw new Error(x);
// })
// .catch(function () {
//   return 1
// })
// .then(function (x) {
//   return x+1
// })
// .then(function (x) {
//   console.log(x);
// })
// .catch(console.error)


// new Promise(function(resolve,reject){
//   resolve(1);
// })
// .then(function (res) {
//   console.log(res)
//   return 2
// })
// .catch(function (err) { return 3 })
// .then(function (res) {
//   console.log(res)
// })

