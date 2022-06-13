const fs = require("fs");

const path = require("path");

// 返回一个可读流对象
const rs = fs.createReadStream(path.resolve(__dirname, "a.txt"), {
  // 可读流一次可读64k
  flags: "r", // fs.open
  encoding: null, // 默认就是buffer
  mode: 0o666,
  autoClose: true, // 读取后是否自动关闭
  emitClose: true, // 是否内部触发一个事件 emit('close')
  highWaterMark: 2, // 每次读取多少个, 默认64k
  start: 0, // 0-5个字节 前后都包过
  end: 5,
});

// 默认会在内部递归的将数据读取完毕
rs.on("data", function (data) {
  console.log(data);
  // 希望能控制读取的速率，读完，等写入到文件中再去读取
  rs.pause() // 暂停 不糊触发data事件
});
rs.on('end', function() {
  console.log('读取完毕 - end')
})
rs.on('close', function() {
  console.log('close')
})
rs.on('error', function() {
  console.log('error')
})

setInterval(() => {
  rs.resume() // 再次触发
}, 1000)