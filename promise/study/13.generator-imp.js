// function* read() {
//   let a = yield "react";
//   console.log(`%c a:${a}`, "red");
//   let b = yield "vue";
//   console.log(`%c b:${b}`, "green");
//   let c = yield "node";
//   console.log(`%c c:${c}`, "blue");
// }
// const it = read()

// 上面的generator 函数编译之后如下

const _regeneratorRuntime = () => {
  return {
    mark(genFn) {
      return genFn;
    },
    wrap(iteratorFn) {
      // iteratorFn 函数会执行多次
      const _context = {
        next: 0,
        sent: null, // 下一次调用next的时候传递的参数会赋予给上一次的返回值
        done: false,
        stop() {
          _context.done = true;
        },
      };
      return {
        // value 就是上一次yield的返回值
        next(v) {
          _context.sent = v; // 每次调用next，会将用户的参数保存到 sent上
          let value = iteratorFn(_context);
          return { value, done: _context.done };
        },
      };
    },
  };
};

var _marked = /*#__PURE__*/ _regeneratorRuntime().mark(read);

function read() {
  var a, b, c;
  return _regeneratorRuntime().wrap(function read$(_context) {
    while (1) {
      // while(true) 表示这个东西是一个状态机，根据状态的变化实现对用的逻辑
      // 这个逻辑会走很多次，没有实际意义， 底层是一个指针，根据指针走到不同的逻辑
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return "react";

        case 2:
          a = _context.sent;
          _context.next = 5;
          return "vue";

        case 5:
          b = _context.sent;
          _context.next = 8;
          return "node";

        case 8:
          c = _context.sent;

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
// wrap 的使用会传入编译后的函数(变成了switch case的模式，将一个函数进行了拆分，根据，_context.next来决定对应执行的逻辑)
// wrap 函数的返回结果迭代器，要有next方法
// 每次用户会调用next方法，传入对应的值，这个值会被保留在 _content.sent, 走下一次调用函数的时候将其取出，赋值给变量

const it = read();
console.log(it.next());
console.log(it.next("aaaaaa"));
console.log(it.next("bbbbbb"));
console.log(it.next("cccccc"));
