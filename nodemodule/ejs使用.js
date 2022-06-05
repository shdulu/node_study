const ejs = require("ejs");
const path = require("path");
const fs = require("fs").promises;

// ejs
//   .renderFile(path.resolve(__dirname, "template.html"), {
//     name: "dulu",
//     age: 30,
//     arr: [1, 2, 3],
//   })
//   .then((data) => {
//     console.log(data);
//   });

// 模板引擎的实现原理： with + new Function()
// with 改变取值作用域
// new Function 执行字符串代码

const ejsSelf = {
  async renderFile(filePath, data) {
    let template = await fs.readFile(filePath, "utf8");
    let head = "let str = ``;\r\n";
    head += "with(obj){ \r\n str += `";
    let content = template.replace(/<%=(.+?)%>/g, function () {
      return "${" + arguments[1] + "}";
    });
    content = content.replace(/<%(.+?)%>/g, function () {
      return "`\r\n" + arguments[1] + "\r\n str+=`";
    });
    let tail = "`}\r\n return str";
    return new Function("obj", head + content + tail)(data);
  },
};

ejsSelf
  .renderFile(path.resolve(__dirname, "template.html"), {
    name: "dulu",
    age: 30,
    arr: [1, 2, 3, 4],
  })
  .then((data) => {
    console.log(data);
  });
