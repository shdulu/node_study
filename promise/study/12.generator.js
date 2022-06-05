// 最早异步 回调 -> promise(基于回调) -> generator 生成器

// **生成器就是生成迭代器的** 迭代器的含义就是 可以拥有迭代方法

/**
 * 1. Array.from
 *
 * */
const arr = Array.from({ 0: 1, 1: 2, 2: 3, length: 3 });
console.log("Array.from:", arr);

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

/**
 * 3. 生成器 - 返回迭代器
 * 生成器返回迭代器，执行迭代器 next() 方法，遇到yield就停止
 * generator 函数，配合yield
 *
 * */

function* read() {
  yield "react";
  yield "vue";
  yield "node";
  return
}
let it = read();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

let done = false;
do {
  let { value, done: flag } = it.next();
  console.log(value);
  done = flag;
} while (!done);

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
  let a = yield "react";
  console.log('a', a)
  let b = yield "vue";
  console.log('b', b)
  let c = yield "node";
  console.log('c', c)
}
let it1 = read1()
// 第一次next传递参数没有意义
// next 传递的参数，是可以赋值给上一次 yield 的返回值
console.log('it1', it1.next())
console.log('it1', it1.next())
console.log('it1', it1.next())