const path = require("path");
const fs = require("fs");
// 用10个字节的大小来实现copy大文件
const buffer = Buffer.alloc(10);

// r读取  w写入  a追加  r+以读取为准增加写入  w+以写入为准增加读取
// 如果文件不存在读取会报错
// 如果写入文件不存在会创建，如果文件中已经有内容了 会清空
fs.open(path.resolve(__dirname, "a.txt"), "r", function (err, rfd) {
  // fd 是一个数字，默认每打开一个文件 +1
  // fd 可以表示 = 描述我要操作a这个文件 并且读取
  // 读取a.txt 第0个位置开始 将内容写入到buffer中， 从buffer 第0个位置写入10个字节
  let readOffset = 0;
  let writeOffset = 0;
  fs.open(path.resolve(__dirname, "b.txt"), "w", function (err, wfd) {
    function next() {
      fs.read(rfd, buffer, 0, 10, readOffset, function (err, bytesRead) {
        if (bytesRead === 0) {
          fs.close(rfd, function () {});
          fs.close(wfd, function () {});
        } else {
          // 写入操作，写入到buffer中，从buffer第0个位置开始读取，读取10个，写入到文件的第0个位置
          fs.write(
            wfd,
            buffer,
            0,
            bytesRead,
            writeOffset,
            function (err, written) {
              readOffset += written;
              writeOffset += written;
              next();
            }
          );
        }
      });
    }
    next();
  });
});

// 上面代码文件操作模式 读和写耦合在一起， 读和写没有相应的关系

// 采用发布订阅的模式来进行解耦。文件中自己实现了文件流