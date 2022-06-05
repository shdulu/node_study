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
function _require(id) {
  let filepath = Module._resolveFilename(id);
  let module = new Module(filepath);
  module.load(); // 加载模块
  return module.exports;
}
const r = _require("./node-2");
console.log(r, "000000000");
