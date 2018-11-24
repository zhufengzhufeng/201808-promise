
// lodash  after 在xxx之后执行
//  after函数 可以限制到达多少次后执行此回调
// function after(times,cb) {
//   return function () {
//     if(--times == 0){
//       cb();
//     }
//   }
// }
// let fn = after(3,function () {
//   console.log('吃完饭了');
// });
// fn();
// fn();
// fn();

// 服务端 node 单线程异步的 非阻塞i/o

let fs = require('fs'); // 他可以操作fileSystem
// 在vscode中用code runner执行 读取的是根目录下的文件
//1.异步没法捕获错误 异步代码不能try{}catch(e){}
//2.异步编程中 可能会出现 回调地狱
//3.多个异步的操作 在同一个时间内容 同步异步的结果

// 1）依赖after 来实现 异步操作
// let schoolInfo = {}
// function after(times,cb) {
//   return function () {
//     if (--times== 0){
//       cb();
//     }
//   }
// }
// let fn = after(2,function () {
//   console.log(schoolInfo);
// });


// 2) 通过发布订阅模式来实现
// 发布订阅 “发布”  “订阅”
let schoolInfo = {}
let dep = {
  arr:[],
  emit(){
    this.arr.forEach(function (fn) {
      fn();
    })
  },
  on(fn){
    this.arr.push(fn);
  }
}
dep.on(function () {
  if (Object.keys(schoolInfo).length === 2){
    console.log(schoolInfo)
  }
});
// dep.on(function () {
//   console.log('哈哈')
// })
fs.readFile('./name.txt','utf8',function (err,data) {
  schoolInfo['name'] = data;
  dep.emit();
});
fs.readFile('./age.txt', 'utf8', function (err, data) {
  schoolInfo['age'] = data;
  dep.emit();
});

