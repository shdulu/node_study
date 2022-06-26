// **生成器就是生成迭代器的** 迭代器的含义就是 可以拥有迭代方法

const arr = Array.from({ 0: 1, 1: 2, 2: 3, length: 3 });
console.log("Array.from:", arr);
const arr3 = [...new Set([1, 2, 3])];

/**
 * 2. 扩展运算符 - 迭代器
 *
 * */
// 扩展运算符作用对象必须是可迭代对象，对象须有迭代属性 Symbol.iterator

const arr1 = [
  ...{
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]() {
      // 迭代器函数，返回一个对象，对象有有next方法，方法中返回value/done
      let i = 0;
      return {
        next: () => {
          return {
            value: this[i],
            done: i++ == this.length,
          };
        },
      };
    },
  },
];
console.log("扩展运算符:", arr1);

// 我们可以通过元编程修改属性本身的逻辑 本身不能迭代我们可以添加迭代方法
const likeArray = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  get [Symbol.toStringTag]() {
    return "MyArray";
  },
  // 迭代器函数：
  // 迭代器 - 每次执行需要调用next方法，产出的结果有value, done
  // 当遇到done为true的时候表示结束,如果done为false会一直不停的调用 迭代器函数
  // 写法1：
  // [Symbol.iterator]() {
  //   let index = 0;
  //   return {
  //     next: () => {
  //       return { value: this[index], done: index++ == this.length };
  //     },
  //   };
  // },
  [Symbol.iterator]: function* () {
    let index = 0;
    let len = this.length;
    while (len !== index) {
      yield this[index++];
    }
  },
};
console.log(likeArray.toString(), "000000");
console.log([...likeArray]);

/**
 * 3. 生成器 - 返回迭代器
 * 生成器返回迭代器，执行迭代器 next() 方法，遇到yield就停止
 * generator 函数，配合yield
 *
 * */

const arr2 = [
  ...{
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function* () {
      let i = 0;
      while (i !== this.length) {
        yield this[i++];
      }
    },
  },
];
console.log("生成器:", arr2);

function* read1() {
  try {
    let a = yield "react";
    console.log("aaa", a);
    let b = yield "vue";
    console.log("bbb", b);
    let c = yield "node";
    console.log("ccc", c);
  } catch (error) {
    console.log("error", error);
  }
}
let it1 = read1();
// 每次调用的时候遇到yield 就停止
// 第一次next传递参数没有意义
// next 传递的参数，是可以赋值给上一次 yield 的返回值
// it.throw 抛出的异常可以在代码中捕获

// ** yield 产出的结果， 可以等待产出的结果执行完毕后，在继续向下执行

console.log("it1", it1.next());
console.log("it1", it1.next("aaaaa"));
console.log("it1", it1.throw("err....."));
console.log("it1", it1.next("ccccc"));

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
