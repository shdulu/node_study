// 原生的es5 是自己实现了promise 不需要考虑兼容

// 1. promise 是一个类 在使用的时候 需要new这个类
// 2. 在new Promise的时候 需要传入一个executor 执行器 默认会立即被调用
// 而参数有两个 resolve,reject 参数
// 3. promise有三个状态 分别是 pedding-默认等待 onfullfield-成功态 onrejected-失败态
// 4. new Promise 会返回一个promise实例 这个实例上会有一个then方法, then 方法中有两个参数一个是成功的回调，一个是失败的回调
// 5. 走向失败有两种情况 reject() 用户主动抛出错误
// 6. 一个promise中可以then多次 (发布订阅模式)
// 7. promise的状态是不能从成功变成失败， 也不能从失败变成成功， 只有pendding的时候状态才能改变

// 我们的promise默认就是pendding 当用户调用resolve时会变成成功态
// 调用reject的时候会变成失败态
// 成功可以传入成功的原因 失败可以传入失败的原因

const MyPromise = require('../promise')
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok");
  }, 1000)
  // reject('error')
  // throw new Error("出错了");
});

p.then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log(reason, "00000");
  }
);

