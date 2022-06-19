// 高阶函数： 一个函数返回一个函数

// 高阶函数解决了什么问题?
// 1. 高阶函数可以进行函数的扩展
// 2.

function core() {
  console.log("core");
}

// cb 就是用户传入的函数(回调函数)
core.before = function (cb) {
  return (...args) => {
    // 箭头函数没有this，没有arguments，没有prototype
    cb();
    this(...args);
  };
};
let newCode = core.before(() => {
  console.log("core - before");
});
newCode();

function say(who) {
  console.log("say", who);
}

Function.prototype.before = function (beforeSay) {
  return (...args) => {
    beforeSay();
    this(...args);
  };
};

let newSay = say.before(() => {
  console.log("say before");
});

newSay("我");
