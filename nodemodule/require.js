const path = require("path");
const fs = require("fs");
const vm = require("vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}
Module._cache = Object.create(null);
Module._extensions = Object.create(null);
Module._extensions[".js"] = function (module) {
  const content = fs.readFileSync(module.id, "utf8");
  const wrapFn = vm.compileFunction(content, [
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
  ]);
  const exports = module.exports;
  const thisValue = exports;
  const require = _require;
  const filename = module.id;
  const dirname = path.dirname(filename);
  Reflect.apply(wrapFn, thisValue, [
    exports,
    require,
    module,
    filename,
    dirname,
  ]);
};
Module._extensions[".json"] = function (module) {
  const content = fs.readFileSync(module.id, "utf8");
  module.exports = JSON.parse(content);
};
Module._extensions[".node"] = function () {};

Module._resolveFilename = function (id) {
  const filepath = path.resolve(__dirname, id);
  if (fs.existsSync(filepath)) {
    return filepath;
  }
  const exts = Object.keys(Module._extensions);
  for (let i = 0; i < exts.length; i++) {
    const file = filepath + exts[i];
    if (fs.existsSync(file)) return file;
  }
  throw new Error("Cannot find module:" + id);
};

Module.prototype.load = function () {
  let extension = path.extname(this.id);              
  Module._extensions[extension] && Module._extensions[extension](this);
};

function _require(id) {
  // 解析文件名是否存在 & 加后缀
  const filename = Module._resolveFilename(id);
  // 先从缓存中取，没有的话 实例化一个module
  // 有了绝对的文件路径后 - 实例化出来一个module对象

  const cachedModule = Module._cache[filename];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  const module = new Module(filename);

  Module._cache[filename] = module;
  // 加载文件
  module.load(this.id);
  return module.exports;
}

debugger;
const str = _require("./hello");
console.log(str);
