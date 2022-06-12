// node 都是基于回调的， 解耦可以采用发布订阅模式。 node很多代码都是基于发布订阅
const EventEmitter = require("./eventsClass");

// const Util = require("util");

// on订阅 emit发布 once订阅一次 off移除监听 removeAllListeners删除所有监听
// console.log(EventEmitter.prototype);

class Girl extends EventEmitter {}

// 原型继承

// function Girl() {

// }
// 不在建议使用 inherits 方式继承，而是使用 class 去继承
// inherits 继承的方式 存在this指向问题需要去兼容处理
// Util.inherits(Girl, EventEmitter);

// 实现原型继承的几种方式：
// Girl.prototype.__proto__ = EventEmitter.prototype
// Girl.prototype = Object.create(EventEmitter.prototype)
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)

let girl = new Girl();

// 只要绑定了这个事件 我就让你自动触发
// let pending = false;
// girl.on("newListener", function (eventName) {
//   if (!pending) {
//     // 类似vue 批处理 nextTick
//     // Promise.resolve.then(() => {})
//     process.nextTick(() => {
//       girl.emit(eventName);
//       pending = false;
//     });
//     pending = true;
//   }
// });

girl.on("我失恋了", function (...arg) {
  console.log("哭", ...arg);
});
girl.on("我失恋了", function () {
  console.log("吃");
});
function shopping() {
  console.log("购物");
}
girl.once("我失恋了", shopping);
girl.off("我失恋了", shopping);
girl.once("我失恋了", function () {
  console.log("go die");
});
girl.emit("我失恋了", "0", "2", [1, 2, 4]);
girl.emit("我失恋了", '1');
girl.emit("我失恋了", '2');
