### 怎么调试代码 vscode

1. 添加 launch.json 文件， 并取消忽略源代码
2. node --inspect-brk test.js 浏览器调试 node

### 怎么看源码 先掌握核心思路 横向扩展，在纵向深入 之后在写一个 mini 版

1. 为什么每个模块都可以使用 这些并不是 this 上的 exports, require, module, filename, dirname ？
2. this 的指向问题？
3. global 全局属性？
4. node 如何实现不加文件后缀名也能读取文件的？
5. commonjs 规范和 es6Module 的区别？
6. commonjs require 是同步还是异步？

```js
// test.js 文件
const str = "hello world!";
module.exports = str;
```

```js
const str = require("./test");
console.log(str); // hello world!
```

```js
(function (module, exports, require, __dirname, __filename) {
  // 1. 读取文件
  const codeStr = `const str = "hello world!";module.exports = str;`;
  // 2. 包装函数， 设置参数
  const codeFn = vm.compileFunction(codeStr, [
    module,
    exports,
    require,
    __dirname,
    __filename,
  ]);
  // 3. 默认返回module.exports
  return module.exports;
})();
```

### 模块化规范

> es6Module - 静态导入，在编译的时候就知道使用了那些变量，可以实现 tree-shaking
> commonjs - 动态导入 默认不支持 tree-shaking,

- 使用 require 引用使用到的模块
- 如果模块需要被别人使用，需要使用 module.exports 导出这个模块
- 可以省略后缀，默认会查找.js .json
- 在 node 中每个文件（js/json）都是一个模块
- 一个包含有多个模块，（每个包会配置 package.json 文件）

### commonJS 模块的实现原理

1. 实现 一个 require 方法，传入文件名作为入参，默认会调用 Module.\_load 方法加载模块
2. 调用 Module.\_resolveFilename 解析文件名 默认会自动添加 .js .json - 目的解析文件绝对路径并加上文件后缀名返回
3. 实现模块的缓存 (根据绝对路径进行模块的缓存) - 如果导出的文件内容变化，缓存会变吗？
4. 尝试加载是否是一个原生模块，如果带相对路径、绝对路径就不是核心模块
5. 创建当前模块实例 `const module = new Module() => {id: 文件绝对路径, export : {}`}
6. 根据创建的模块调用 module.load 加载模块
7. 加载模块时会构建一个 paths 属性，这个属性就是第三方模块的查找路径 一直找到根目录
8. 根据文件的后缀，调用注册的方法(策略模式)【策略模式方便扩展】
9. fs.readFileSync() 加载文件， 读取文件的内容
10. 调用 module.\_compile 给读取到的内容包装成函数 - vm.compileFunction
11. 执行 r equire 函数将 module 传递给用户 用户会手动的 module.exports 赋值
