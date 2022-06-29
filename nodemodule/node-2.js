// 基本类型和引用类型的区别 如果导出的是一个基本类型的值，这个值就算变化了，也不会
// 重新获取新的值。
// 如果导出的是一个引用类型，如果改变了引用类型的值，那么重新获取值会变化
// module.exports exports this 三者之前的关系
let obj = {
  a: 1,
};
setTimeout(() => {
  obj.a++;
}, 1000);

module.exports = obj;
// exports.a = 100
// this.a = 900;


// let str = require('./node-1')
// require
// 1) 读取文件内容
// 2) 包装函数
// 3) 默认返回module.exports