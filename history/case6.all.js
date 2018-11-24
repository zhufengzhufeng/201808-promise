// Promise.all是并发的 并且结果是有顺序的

// let Promise = require('./promise3');
let fs = require('fs');
function read(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    })
  });
}


Promise.race([read('./name.txt'),read('./age.txt')]).then(function (data) {
  console.log(data);
},function (err) {
  console.log(err)
})