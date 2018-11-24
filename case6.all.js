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
Promise.all = function (promises) {
  return new Promise(function (resolve,reject) {
    let arr = [];
    // 处理数据的方法
    let i = 0;
    function processData(index,data) {
      arr[index] = data; //数组的索引和长度的关系
      if (++i === promises.length){ // 当数组的长度 和promise的个数相等时 说明所有的promise都执行完成了
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length;i++){
      let promise = promises[i];
      if (typeof promise.then == 'function'){
        promise.then(function (data) {
          processData(i, data); // 把索引和数据 对应起来 方便使用
        }, reject)
      }else{
          processData(i,promise);
      }
    }
  });
}

Promise.all([read('./name.txt'),read('./age.txt'),2]).then(function (data) {
  console.log(data);
},function (err) {
  console.log(err)
})