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

