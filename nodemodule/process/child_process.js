const { exec, execFile, spawn } = require("child_process");
let path = require("path");

// // exec
// exec("node", "./sub_process.js", function (err, stdout, stdin) {
//   console.log("exec:", err, stdout);
// });

// // 通过node命令,直接执行某个文件
// execFile("node", ["./sub_process.js"], function (err, stdout, stdin) {
//   console.log("execFile:", stdout);
// });

const child = spawn("cnpm", ["install"], {
  cwd: path.resolve("D:myProject\node\node_study"),
});

child.stdout.on('data', function(chunk) {
    console.log('stdout', chunk.toString())
})                            

child.stderr.on('data', function(chunk) {
    console.log('stderr', chunk.toString())
})