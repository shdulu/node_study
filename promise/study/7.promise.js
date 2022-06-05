const MyPromise = require("./history/1.promise");

const fs = require("fs");

function readFile(...args) {
  return new MyPromise((resolve, reject) => {
    fs.readFile(...args, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
// 如果用户在then的成功或者失败的回调函数中返回一个promise，会根据这个promise
// 的状态来决定走外层下一个then的成功或者失败，并且将原因向下传递

// 什么时候会走到下一个then的失败 1.抛出错误 2. 返回一个失败的promise 3. 其他走成功的then
readFile("a.txt", "utf8")
  .then(
    (data) => {
      console.log(data, "111111111111");
      // throw new Error('失败')
      return readFile(data, "utf8");
    },
    (err) => {
      console.log(err);
      return 100;
    }
  )
  .then(
    (data) => {
      console.log(data, "22222data");
    },
    (err) => {
      console.log(err, "22222err");
    }
  );
