const fs = require("fs");
const path = require("path");
const person = {};

let event = {
  _arr: [],
  on(callback) {
    // 订阅
    this._arr.push(callback);
  },
  emit(...args) {
    // 发布 执行订阅的事件
    this._arr.forEach((fn) => fn(...args));
  },
};

event.on(function () {
  if (Object.keys(person).length === 2) {
    console.log("当前已经读取完毕了", person);
  } else {
    console.log("读取成功一次就打印", person);
  }
});

fs.readFile(path.resolve(__dirname, "a.txt"), "utf-8", function (err, data) {
  person.name = data;
  event.emit(1);
});

fs.readFile(path.resolve(__dirname, "b.txt"), "utf-8", function (err, data) {
  person.age = data;
  event.emit(2);
});
