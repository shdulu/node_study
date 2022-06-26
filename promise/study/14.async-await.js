// const fs = require("fs");
// const path = require("path");
// async function read() {
//   let name = await fs.readFile(path.resolve(__dirname, "a.txt"), "utf8");
//   let bTxt = await fs.readFile(path.resolve(__dirname, name), "utf8");
//   return bTxt;
// }

// async await = generator + co 的语法糖

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function read() {
  return _read.apply(this, arguments);
}

function _read() {
  _read = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
      var name, bTxt;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return fs.readFile(path.resolve(__dirname, "a.txt"), "utf8");

            case 2:
              name = _context.sent;
              _context.next = 5;
              return fs.readFile(path.resolve(__dirname, name), "utf8");

            case 5:
              bTxt = _context.sent;
              return _context.abrupt("return", bTxt);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _read.apply(this, arguments);
}
