// generator 生成器 es6 提供的 生成的是迭代器

// function sum() {
//  // spread
//  let r =  [...arguments].join('');
//  console.log(r);
// }

// let obj = {0:1,1:2,2:3,length:3};
// console.log( [...obj]); // 默认obj 是不能被迭代的 

// 生成器 生成的就是迭代器 迭代器是一个对象，对象上有一个next方法这个方法调用后可以返回 value,done

// 迭代函数
// let o = { 0: 1, 1: 2, 2: 3, length: 3 ,[Symbol.iterator]:function () {
//   let currentIndex = 0;
//   let that = this;
//   return {
//     next(){
//       return { value: that[currentIndex++],done:currentIndex-1 === that.length}
//     }
//   }
// }}

// let o = {
//   0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () {
//     let index = 0;
//     while (index !== this.length) {
//       yield this[index];
//       index++;
//     }
//   }
// }
// let arr = [...o];
// console.log(arr); // 生成器可以实现生成迭代器，生成器函数 就是再函数关键字中加个* 配合yield来使用
// yield 是有暂停功能的

// function * say() {
//   yield 'node';
//   yield 'react';
//   yield 'vue';
// }
// // 如何遍历迭代器 遍历到done 为true时
// let it = say();
// let flag = false;
// do{
//   let {value,done} = it.next();
//   console.log(value);
//   flag = done;
// }while(!flag);

//  yield的返回值


// function * say() {
//     let a = yield 'hello';
//     console.log('a',a);
//     let b = yield 'world';
//     console.log('b',b);
//     let c = yield 'zfpx';
//     console.log(c);
// }
// let it = say();
// it.next(100); // 第一次next传递参数 是无意义的
// it.next(200);
// it.next(300);




let fs = require('fs');
function read(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    })
  });
}

function * r() {
   let r1 = yield read('./1.txt');
   let r2 = yield read(r1);
   let r3 = yield read(r2);
  return r3
}
function co(it) {
  return new Promise(function (resolve,reject) {
    // next方法  express koa  原理 都是这样的
    function next(data) { // 使用迭代函数来实现 异步操作按顺序执行
      let { value, done } = it.next(data);
      if(done){
        resolve(value);
      }else{
        value.then(function (data) {
          next(data)
        },reject);
      }
    }
    next();
  });
}
co(r()).then(function (data) {
  console.log(data);
})
// let it = r();
// let {value,done} = it.next();
// value.then(function (data) { // data->2.txt
//   let {value,done} = it.next(data);
//   value.then(function (data) {
//     let { value, done } = it.next(data);
//     value.then(function (data) {
//       console.log(data); // data-> 结果
//     })
//   })
// })


// read('./1.txt',function (err,data) {
//   return read(data)
// }).then(function (data) {
//   return read(data);
// }).then(function (data) {
//   return read(data);
// }).then(function (data) {
//   console.log(data);
// })


// 把 promise es5 -> es6来写