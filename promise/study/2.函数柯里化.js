// 函数柯里化
// 柯里化是将一个多个参数的函数，转化成 **一个个** 参数传入的函数
// 函数柯里化的目的 就是将一个函数细化

function sum(a, b, c) {
  return a + b + c;
}
sum(1, 2, 3);

function sum1(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
let c = sum1(1)(2);
c(3);

// 判断一个参数的类型的方式：
// 1. typeof 判断类型 只适合基本类型
// 2. constuctor {}.constuctor = Object
// 3. instanceOf xxx instanceOf Xxx
// 4. Object.prototype.toString.call()

function isType(type) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
}
const isString = isType("String");
const isNumber = isType("Number");
const isBoolean = isType("Boolean");

console.log(isString("abc"));
console.log(isString(123));

let util = {}[("String", "Number", "Boolean")].forEach((method) => {
  util["is" + method] = isType(method);
});
util.isString('1234')
util.isNumber('1234')

// 偏函数 柯里化函数区别

// 这个是偏函数，可以分批传入函数， 柯里化必须是一个个传
function sum2(a, b) {
  return function (c) {
    return a + b + c;
  };
}
sum2(1, 2)(3);

// 实现一个通用的柯里化函数 可以将这个函数自动转换成柯里化形式
function sum3(a, b, c) {
  return a + b + c;
}
let curring = (fn, args) => {
  // 需要根据fn的长度 和 我们当前调用时传递的参数做比较，比较两个数的大小，
  // 如果参数个数大于用户传递的参数，需要返回一个新的函数，否则让这个函数执行
  function inner(args = []) {
    // args 每次用户调用的参数列表
    return fn.length > args.length
      ? // 累计参数
        (...arr) => inner([...args, ...arr])
      : fn(...args);
  }
  return inner(args);
};
let fn1 = curring(sum3);
let fn2 = fn1(1, 2);
let r = fn2(3);
console.log(r);
