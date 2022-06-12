// 全局属性 就是可以直接访问的属性 module, exports, require, __dirname __filename 并不属于gloable属性
// console.log(global);

// console.log(process) // 当前运行的进程
// console.log(global.Buffer) // 二进制对象

const processKeys = [
  "version",
  "versions",
  "arch",
  "platform",
  "release",
  "_rawDebug",
  "moduleLoadList",
  "binding",
  "_linkedBinding",
  "_events",
  "_eventsCount",
  "_maxListeners",
  "domain",
  "_exiting",
  "config",
  "dlopen",
  "uptime",
  "_getActiveRequests",
  "_getActiveHandles",
  "reallyExit",
  "_kill",
  "hrtime",
  "cpuUsage",
  "resourceUsage",
  "memoryUsage",
  "kill",
  "exit",
  "openStdin",
  "allowedNodeEnvironmentFlags",
  "assert",
  "features",
  "_fatalException",
  "setUncaughtExceptionCaptureCallback",
  "hasUncaughtExceptionCaptureCallback",
  "emitWarning",
  "nextTick",
  "_tickCallback",
  "_debugProcess",
  "_debugEnd",
  "_startProfilerIdleNotifier",
  "_stopProfilerIdleNotifier",
  "stdout",
  "stdin",
  "stderr",
  "abort",
  "umask",
  "chdir",
  "cwd",
  "env",
  "title",
  "argv",
  "execArgv",
  "pid",
  "ppid",
  "execPath",
  "debugPort",
  "argv0",
  "_preload_modules",
  "channel",
  "_handleQueue",
  "_pendingMessage",
  "send",
  "_send",
  "connected",
  "disconnect",
  "_disconnect",
  "mainModule",
];
console.log(process.platform);

// process.platform 进程运行的平台
// process.nextTick
// process.cwd
// process.env
