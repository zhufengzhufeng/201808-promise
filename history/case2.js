let Promise = require('./promise1');
let p = new Promise(function (resolve,reject) {
  setTimeout(() => {
    resolve('xx')
  }, 1000);
})

p.then(function (data) {
  console.log('success',data)
},function (err) {
  console.log(err);
})
p.then(function (data) {
  console.log('success', data)
}, function (err) {
  console.log(err);
})