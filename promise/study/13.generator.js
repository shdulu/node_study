const fs = require("fs").promises;
const co = require("co");
const { wrap } = require("module");

function* read() {
  let out1 = yield fs.readFile("a.txt", "utf-8");
  let out2 = yield fs.readFile(out1, "utf-8");
  return out2;
}

let it = read();

let { value, done } = it.next();

value.then((data) => {
  // out1 = data -> b.txt
  let { value, done } = it.next(data);
  value.then((data2) => {
    let { value, done } = it.next(data2);
    console.log(value, "0000000000");
  });
});

// co的方式实现
// co(read()).then(data => {
//   console.log(data, '------------')
// })

// 异步任务串行执行
// co的实现方式
function coFn(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let { value, done } = it.next(data); // done 是否完成, value本次yield的返回值
      if (done) {
        return resolve(value);
      }
      Promise.resolve(value).then((data) => {
        next(data);
      }, reject);
    }
    next();
  });
}
// coFn(it)

// const regeneratorRuntime = {
//   mark(outerFn) {
//     return outerFn;
//   },
//   wrap(innerFunc, outerFn) {
//     // 核心就是生成器会返回一个迭代器
//     const _context = {
//       next: 0,
//       done: false,
//       abrupt(type, value) {
//         _context.next = 'end'
//         innerFunc(_context);
//         return value
//       },
//       stop() {
//         this.done = true;
//       },
//     };
//     return {
//       next(data) {
//         _context.sent = data;
//         let value = innerFunc(_context);
//         return {
//           value,
//           done: _context.done,
//         };
//       },
//     };
//   },
// };



async function read1() {
  let out1 = await fs.readFile("a.txt", "utf-8");
  let out2 = await fs.readFile(out1, "utf-8");
  return out2;
}