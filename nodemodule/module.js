// commonjs 模块化实现

const path = require("path");
const fs = require("fs");
const vm = require("vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module._extensions = {
  ".js"(module) {
    let source = fs.readFileSync(module.id);
    let wrapper = [
      "(function(exports, module, require, __dirname, __filename){",
      "})",
    ];
    const script = wrapper[0] + source + wrapper[1];
    let fn = vm.runInThisContext(script);
    let exports = module.exports;
    const filename = module.id;
    const dirname = path.dirname(filename);
    // 执行此函数，用户会自动给module.exports 赋值
    // 此函数执行的时候this发生了变化
    fn.call(exports, exports, module, _require, dirname, filename);
  },
  ".json"() {
    let content = fs.readFileSync(module.id);
    module.exports = JSON.parse(content);
  },
};

Module._resolveFilename = function (id) {
  let filepath = path.resolve(__dirname, id);
  if (fs.existsSync(filepath)) return filepath;
  let exts = Object.keys(Module._extensions);
  for (let i = 0; i < exts.length; i++) {
    let p = filepath + exts[i];
    if (fs.existsSync(p)) return p;
  }
  throw new Error("模块不存在");
};
// 加载模块
Module.prototype.load = function () {
  // 获取模块后缀
  let extension = path.extname(this.id);
  Module._extensions[extension](this);
};

// 全局的缓存区，用来缓存模块的
Module._cache = {};

function _require(id) {
  let filepath = Module._resolveFilename(id);
  if (Module._cache[filepath]) {
    return Module._cache[filepath].exports;
  }
  let module = new Module(filepath);
  Module._cache[filepath] = module;
  module.load(); // 加载模块
  return module.exports;
}
const r = _require("./node-2");
// const r1 = _require("./node-2");
// const r2 = _require("./node-2");

// 如果不是相对路径或者绝对路径，那么他指有两种可能一种是内置模块，另一种就是第三方模块
// 查找第三方模块会根据 module.paths 的顺序进行查找，不停的到，找到后就范湖找不到就报错
// const r2 = _require("node-2");
console.log(r, "000000000");

// setInterval(() => {
//   console.log(r);
// }, 1000);
