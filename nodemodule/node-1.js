// 服务端可以直接访问 global

// console.log(global);

// 模块中的this不是global， 与男银在于node中有天生的模块化规范 commonjs
// 把每个文件都当做模块

// console.log(this);

// 模块化规范有哪些：
/**
 * amd - define
 * umd - 支持amd + commonjs + global 不支持es6Module
 * cmd - seajs
 * commonjs - node 中自己实现的
 * es6Module - import export
 * SystemJS - 微前端
 * life - 立即执行函数
 *
 * */

// commonjs规范是node的， 特点就是定义了如何导入、导出、定义模块
/**
 * 导入 - require 方法
 *
 *
 * */
// 导出 - module.exports
// 定义 - 每一个js文件都是模块，*每次引入文件的时候都会在外层添加一个函数，** 并且改变this指向
// 默认这个函数中也提供了几个参数 5个，不是global上的参数属性，但是在文件中可以直接访问
// node 是如何实现模块化的： 在每个文件都包了一个函数 接收五个参数
// const node2 = require('./node-2')
// console.log(exports) // 0 模块导出的结果
// console.log(require) // 1 可以引入其他模块
// console.log(module) // 2 当前模块对象
// console.log(__filename) // 3 当前文件本身绝对路径
// console.log(__dirname) // 4 绝对路径，当前文件所在的文件夹绝对路径

// function(exports, module, require, __dirname, __filename) {}()

// console.log(arguments.callee.toString()) - node 自己包的函数

// node 中常用模块 fs(文件系统) path(路径系统)
const fs = require("fs"); // require 怎么实现的

// 同步读取文件
fs.readFileSync("./node-2.js", "utf-8");

// 如何执行一个字符串？
// 1. eval - 会引用上级作用域的变量 适合简单的js执行，不依赖上下文变量
// 2. new Function() 会创造一个和全局平级的执行环境 也会引用上下级变量
// 3. vm 虚拟机模块 实现一个安全的执行，但是挂载全局上已经可以获取到

const vm = require("vm");
var a = 100;
vm.runInThisContext("let a = 90; console.log(a)");

const path = require("path");
//
console.log(path.join("a", "b", "c", "..", "/"));
console.log(path.resolve("a", "b"));
// 根据已有路径（命令运行路径）来解析绝对路径
// resolve 不支持 / 会解析成根路径
// __dirname - 当前绝对路径
// path.extname 获取文件扩展名
// path.dirname 当前运行的父级目录

