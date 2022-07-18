debugger;
const str = require("./hello");
console.log(str);



// require 执行流程 !!!
// 1. Module._load 加载模块
// 2. Module._resolveFilename 解析文件名 默认会自动添加 .js .json
// 3. new Module() => {id: '文件名', exports} 创建module实例
// 4. 最终返回的就是 module.exports
// 5. module.load(filename)
// 6. 根据文件的后缀调用注册的方法（策略模式）Module._extensions[extension](this, filename)
// 7. 加载js文件，读取文件
// 8. module._compile(content, filename) 给读取到的内容包装函数 wrapSafe() vm.compileFunction() 
// exports require module __filename __dirname
// 9. 最终返回 module.exports

// 全局属性 global 就是可以直接访问的属性 module, exports, require, __dirname __filename 并不属于gloable属性
// console.log(global);

// console.log(process) // 当前运行的进程
// console.log(global.Buffer) // 二进制对象

// const processKeys = [
//   "version",
//   "versions",
//   "arch",
//   "platform",
//   "release",
//   "_rawDebug",
//   "moduleLoadList",
//   "binding",
//   "_linkedBinding",
//   "_events",
//   "_eventsCount",
//   "_maxListeners",
//   "domain",
//   "_exiting",
//   "config",
//   "dlopen",
//   "uptime",
//   "_getActiveRequests",
//   "_getActiveHandles",
//   "reallyExit",
//   "_kill",
//   "hrtime",
//   "cpuUsage",
//   "resourceUsage",
//   "memoryUsage",
//   "kill",
//   "exit",
//   "openStdin",
//   "allowedNodeEnvironmentFlags",
//   "assert",
//   "features",
//   "_fatalException",
//   "setUncaughtExceptionCaptureCallback",
//   "hasUncaughtExceptionCaptureCallback",
//   "emitWarning",
//   "nextTick",
//   "_tickCallback",
//   "_debugProcess",
//   "_debugEnd",
//   "_startProfilerIdleNotifier",
//   "_stopProfilerIdleNotifier",
//   "stdout",
//   "stdin",
//   "stderr",
//   "abort",
//   "umask",
//   "chdir",
//   "cwd",
//   "env",
//   "title",
//   "argv",
//   "execArgv",
//   "pid",
//   "ppid",
//   "execPath",
//   "debugPort",
//   "argv0",
//   "_preload_modules",
//   "channel",
//   "_handleQueue",
//   "_pendingMessage",
//   "send",
//   "_send",
//   "connected",
//   "disconnect",
//   "_disconnect",
//   "mainModule",
// ];
// console.log(process.platform);

// process.platform 进程运行的平台
// process.nextTick
// process.cwd
// process.env
