// 我们需求是这样的 同时读取两个文件 拿到最终结果

// 对于异步而言常见的两个场景 (可以采用计数器的方式，但是逻辑不好拆分，在确定请求次数的情况下)
// 通过计数可以实现异步

// 1) 我们希望同步多个异步请求结果
// 2) 第一个请求的结果是第二个请求的输入结果
// 2) 解决异步的问题的解决方案可以 使用回调的方式

const fs = require("fs");

let school = {};

const after = (times, callback) => {
  return function () {
    if (--times === 0) {
      callback();
    }
  };
};
let out = after(2, () => {
  console.log("00000", school);
});

// 使用发布订阅模式 将这个模型再次简化， 期望每次执行都能监控到结果
// after 函数只能拿到最终结果，中间过程无法监控
fs.readFile("./a.txt", "utf8", function (err, data) {
  school.name = data;
  out();
});

fs.readFile("./b.txt", "utf8", function (err, data) {
  school.age = data;
  out();
});

console.log(school);
