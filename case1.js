let Promise = require('./promise');


let p = new Promise(function (resolve,reject) {
   reject('zzz')
})

p.then(function (data) {
  console.log('success',data)
},function (err) {
  console.log(err);
})