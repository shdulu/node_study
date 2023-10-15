// 高阶函数
// 1. 一个函数返回一个函数
// 2. 一个函数的参数是一个函数

// AOP 切片编程添加额外的逻辑
function core(...args) {
  console.log("core核心逻辑", ...args);
}

core.before = function (fn) {
  return (...args) => {
    fn();
    this(...args); // 箭头函数中没有this，没有原型、没有arguments
  };
};

const newCore = core.before(() => {
  console.log("core执行前的额外逻辑");
});

newCore("nihao", 19);

/**
 * 高阶函数能做什么
 * - 扩展函数逻辑
 * - 函数柯理化 -把复杂函数分步拆分成更小的函数完成，每一个函数的参数只能有一个 fn1 -> fn2 -> fn3
 * - 偏函数: 参数不止一个的柯理化函数
 *
 * 实例: 判断某个变量的类型
 *
 *
 * */

function isType(type) {
  return (val) => {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
}
const isString = isType("String");

/**
 * @description: 将函数柯里化的工具函数
 * @param {Function} fn 待柯里化的函数
 * @param {array} args 已经接收的参数列表
 * @return {Function}
 */
const currying = function (fn, ...args) {
  const len = fn.length;
  return function (...params) {
    let _args = [...args, params];
    if (_args.length < len) {
      return currying.call(this, fn, ..._args);
    }
    return fn.apply(this, _args);
  };
};

const isNumber = currying(isType)("Number");
console.log(isNumber(123), '----------')