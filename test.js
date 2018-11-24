let obj = {

}
let index = 1;
Object.defineProperty(obj,'then',{
  get(){
    if(index ==2){
      throw new Error()
    }
    index++;
  }
})

let p = new Promise((resolve,reject)=>{
  resolve('hello');
  reject();
})
p.then(function () {
  
},function (params) {
  
})