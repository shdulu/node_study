Node.js 进程创建，是通过 child_process 模块

- child_process.spawn(） 异步生成子进程
  流式，更适合做耗时任务比如：npm install，持续的日志
- child_process.fork() 产生一个新的 Node.js 进程，并使用建立的 IPC 通信通道调用指定的模块，该通道允许在父级和子级之间发送消息。

- child_process.exec() 产生一个 shell 并在该 shell 中运行命令
  开销比较小的任务
- child_process.execFile() 无需产生 shell
