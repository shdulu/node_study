const fs = require("fs");

// 使用发布订阅模式 将这个模型再次简化，期望每次执行都能监控到结果
// 发布订阅模式，好处发布订阅之前没有任何关系， 不订阅也可以发布。两个人的关系不耦合在一起

const events = {
  _arr: [],
  on(fn) {
    this._arr.push(fn);
  },
  emit() {
    this._arr.forEach((fn) => fn());
  },
};

events.on(function () {
  console.log("每次读取完毕都执行");
});
events.on(function () {
  if (Object.keys(school).length === 2) {
    console.log("读取完毕");
  }
});

let school = {};
fs.readFile("./a.txt", "utf8", function (err, data) {
  school.name = data;
  events.emit();
});

fs.readFile("./b.txt", "utf8", function (err, data) {
  school.age = data;
  events.emit();
});

module.exports = {
  events,
};

// 和观察这模式的区别 发布订阅之前有关系 (内部观察者模式基于发布订阅) 观察分为观察者和被观察者
// 发布订阅 需要手动触发emit
