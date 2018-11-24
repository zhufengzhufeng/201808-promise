// let Promise = require('./promise1');
// 同一个promise可以then多次
let p = new Promise(function (resolve,reject) {
     resolve('xx')
})
p.then(function (data) {
  console.log('success',data)
},function (err) {
  console.log(err);
});
