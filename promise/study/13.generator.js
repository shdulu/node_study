const fs = require("fs").promises;
const path = require("path");
const co = require("co");

// 使用案例：
function* readFile() {
  // 这个逻辑更像同步，但是底层我们可以变写成异步的
  let name = yield fs.readFile(path.resolve(__dirname, "a.txt"), "utf8");
  let age = yield fs.readFile(path.resolve(__dirname, name), "utf8");
  return age;
}

let it2 = readFile();
let { value, done } = it2.next();
if (!done) {
  value
    .then((data) => {
      let { value, done } = it2.next(data);
      if (!done) {
        value
          .then((data) => {
            let { value, done } = it2.next(data);
            if (done) {
              console.log(value);
            }
          })
          .catch((e) => {
            it2.throw(e);
          });
      }
    })
    .catch((e) => {
      it2.throw(e);
    });
}

// co 模块
const coResult = co(readFile);
coResult
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// 异步串行 需要用递归解决
// 迭代调用next方法
function coFn(genFn) {
  const it = genFn(); // 迭代器函数
  return new Promise((resolve, reject) => {
    function next(data) {
      let { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value)
          .then((data) => {
            // 没有执行完，递归执行，并把data向下传递
            next(data);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        // done 为 true 结束
        return resolve(value);
      }
    }
    // 第一次 undefine
    next();
  });
}
coFn(readFile).then((data) => {
  console.log(data, "-----------");
});
