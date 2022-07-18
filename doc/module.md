### 怎么调试代码 vscode

1. 添加 launch.json 文件， 并取消忽略源代码
2. node --inspect-brk test.js 浏览器调试 node

### 先掌握核心思路 横向扩展，纵向深入 之后在写一个 mini 版

1. Commonjs 规范和 Es Module 的区别？
2. Commonjs require 是同步还是异步？
3. 为什么每个模块都可以使用 这些并不是 this 上的 exports, require, module, filename, dirname ？
4. this 的指向问题？
5. global 全局属性？
6. node 如何实现不加文件后缀名也能读取文件的？
7. 为啥不能同时使用 exports module.exports 或者给 exports 赋值？
8. 怎么解决递归引用？
9. `require` 模块查找机制？

### 为什么要有模块化？

解决全局污染
依赖管理

### CommmonJs 的特点

- 在 commonjs 中每一个 js 文件都是一个单独的模块，我们可以称之为 module
- 该模块中，包含 CommonJS 规范的核心变量: exports、module.exports、require
- exports 和 module.exports 可以负责对模块中的内容进行导出
- require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

### 模块化规范

> Es Module - 静态导入，在编译的时候就知道使用了那些变量，可以实现 tree-shaking
> Commonjs - 动态导入 默认不支持 tree-shaking,

- 使用 require 引用使用到的模块
- 如果模块需要被别人使用，需要使用 module.exports 导出这个模块
- 可以省略后缀，默认会查找.js .json
- 在 node 中每个文件（js/json）都是一个模块
- 一个包含有多个模块，（每个包会配置 package.json 文件）

### Commonjs 模块的实现原理

```js
function fn(exports, require, module, __filename, __dirname) {
  const str = "hello world!";
  module.exports = str;
}
function wrapper(script) {
  return (
    "(function (exports, require, module, __filename, __dirname) {" +
    script +
    "\n})"
  );
}
const modulefunction = wrapper(fn);
// eval new Function

// 模块加载的时候通过 runInThisContext 执行， 出入参数
vm.runInThisContext(modulefunction)(
  exports,
  require,
  module,
  __filename,
  __dirname
);

```

1. 实现一个 require 方法，传入文件名作为入参，调用 `Module._load` 方法加载模块， 返回 `module.exports`
2. 
2. 调用 `Module._resolveFilename` 解析文件名 默认会自动添加 .js .json - 目的解析文件绝对路径并加上文件后缀名返回
3. 实现模块的缓存 (根据绝对路径进行模块的缓存) - 如果导出的文件内容变化，缓存会变吗？
4. 尝试加载是否是一个原生模块，如果带相对路径、绝对路径就不是核心模块
5. 创建当前模块实例 `const module = new Module() => {id: 文件绝对路径, export : {}`}
6. 根据创建的模块调用 `module.load` 加载模块
7. 加载模块时会构建一个 paths 属性，这个属性就是第三方模块的查找路径 一直找到根目录
8. 根据文件的后缀，调用注册的方法(策略模式)【策略模式方便扩展】
9. `fs.readFileSync` 加载文件， 读取文件的内容
10. 调用 `module._compile` 给读取到的内容包装成函数 - vm.compileFunction
11. 执行 require 函数将 module 传递给用户 用户会手动的 `module.exports` 赋值
