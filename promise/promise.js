// https://promisesaplus.com/

// 原生的es5 是自己实现了promise 不需要考虑兼容

// 1. promise 是一个类 在使用的时候 需要new这个类
// 2. 在new Promise的时候 需要传入一个executor 执行器 默认会立即被调用
// 而参数有两个 resolve,reject 参数
// 3. promise有三个状态 分别是 pedding-默认等待 onFulfilled-成功态 onrejected-失败态
// 4. new Promise 会返回一个promise实例 这个实例上会有一个then方法, then 方法中有两个参数一个是成功的回调，一个是失败的回调
// 5. 走向失败有两种情况 reject() 用户主动抛出错误
// 6. 一个promise 中可以then多次 (发布订阅模式)
// 7. promise 的状态是不能从成功变成失败， 也不能从失败变成成功， 只有pendding的时候状态才能改变
// 8. 异步情况，需要先把状态存放起来等 resolve, reject调用 发布订阅
// 9. then 方法的成功或者失败的回调函数中返回一个promise，会根据这个 promise 的状态来决定走外层下一个 then 的成功或者失败，并且将原因向下传递

// 我们的promise默认就是pendding 当用户调用resolve时会变成成功态
// 调用reject的时候会变成失败态
// 成功可以传入成功的原因 失败可以传入失败的原因
const PENDING = "PENDING";
const FULFILlED = "FULFILlED";
const REJECTED = "REJECTED";

/**
 * 解析 promise2 和 x之间的关系 来判断 promise2走resolve还是reject
 *
 * @param {*} x - x 的取值决定promise2走成功还是失败
 * @param {*} promise2
 * @param {*} resolve promise2 - 成功的回调
 * @param {*} reject promise2 - 失败的回调
 * @return {*}
 */
function resolvePromise(x, promise2, resolve, reject) {
  // If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (promise2 === x) {
    return reject(
      new TypeError(`Chaining cycle detected for promise #<Promise>`)
    );
  }
  // 判断x 是不是一个promise 先保证x是一个对象或者函数，如果不是对象或者函数那一定不是promise
  if ((typeof x === " " && x !== null) || typeof x === "function") {
    let called;
    // 还需要看 这个x上有没有then方法 有then方法才说明他是一个promise
    try {
      let then = x.then; // x 可能是别人写的promise 取then有风险
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(y, promise2, resolve, reject); // 递归解析 直到y的值是一个普通值
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x); // 只是一个对象而已，就是一个普通值
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // x 是一个普通的值， 直接把x传递给promise2的resolve， 成功
    resolve(x);
  }
}

class MyPromise {
  constructor(exector) {
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.status = PENDING;
    this.onResolvedCallbacks = []; // 存放成功的回调
    this.onRejectedCallbacks = []; // 存放失败的回调

    // 这两个方法非共享，每次new 都会产生新的方法
    const resolve = (value) => {
      // 对接收到的promise进行处理， resolve 会等待接收到的promise处理
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILlED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      // 捕获用户抛出错误
      exector(resolve, reject); // 传递用户两个参数
    } catch (e) {
      reject(e);
    }
  }
  then(onFullfield, onRejected) {
    // onFullfield, onRejected 可能是可选参数
    onFullfield =
      typeof onFullfield === "function" ? onFullfield : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    // 实现then链式调用的关键 - 返回一个promsie
    // then传递成功和失败函数，针对他的返回值会做不同的处理：
    // 1) 如果返回的不是promise， 那么这个值会被直接传递到下一次then的成功回调中
    // 2) 如果想走到下一次then的失败中去，需要在本次then的成功的回调抛出异常
    // 3) 返回的值是一个promise的情况，则会根据返回的promise来决定走成或失败（解析promise决定走成功还是失败）
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILlED) {
        setTimeout(() => {
          // 使用 setTimeout 确保 可以拿到 promise2 作为参数传递
          // new Promsie 同步先执行 promise2可以作为入参到resolvePromise
          try {
            // 这里用 try catch 捕获到异步异常 -
            let x = onFullfield(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e); // 捕获到异常走到 promise2的异常里
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFullfield(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(errCallback) {
    return this.then(null, errCallback);
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }
  static all(values) {
    return new MyPromise((resolve, reject) => {
      let times = 0;
      function processMap(key, value) {
        arr[key] = value;
        if (++times === values.length) {
          resolve(arr);
        }
      }
      const arr = [];
      for (let i = 0; i < values.length; i++) {
        const val = values[i]; // 可能是promise 也可能是普通值
        let then = val && val.then;
        if (typeof then === "function") {
          then.call(
            val,
            (data) => {
              processMap(i, data);
            },
            reject
          );
        } else {
          processMap(i, val);
        }
      }
    });
  }
  // 赛跑， 有一个状态变化就结束
  static race(values) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < values.length; i++) {
        const p = values[i];
        // 无论谁先成功成功，谁先失败就失败
        MyPromise.resolve(p).then(resolve, reject);
      }
    });
  }
  static finally(cb) {
    return this.then(
      (y) => {
        // 兼容 cb 是promise的情况，等待promise执行完成执行cb
        return MyPromise.resolve(cb()).then(() => y);
      },
      (r) => {
        return MyPromise.resolve(cb()).then(() => {
          throw r;
        });
      }
    );
  }
}

MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
// npm i promises-aplus-test
// promises-aplus-tests 1.promise
module.exports = MyPromise;
