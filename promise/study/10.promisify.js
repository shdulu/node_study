const fs = require("fs");

// node异步api转promise的方法

// 方式1：
// promisify 把node 中某一个异步api 转成promise
// const { promisify } = require("util");
// const read = promisify(fs.readFile)

// 方式2：
// const fs = require('fs').promises
// 把 fs中的所有对象转成promise


// 把异步api转成promise
function selfPromisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) return reject(err);
        resolve(data); 
      });
    });
  };
}

// promisify 高阶函数 接收一个函数返回一个函数
const read = selfPromisify(fs.readFile);

read("./a.txt", "utf8").then((data) => {
  console.log(data);
});
