console.time();
setTimeout(() => {
  console.log("setTimeout.log1");
}, 1000);
setTimeout(() => {
  console.log("setTimeout.log2");
}, 2000);
setTimeout(() => {
  console.log("setTimeout.log.5");
  setTimeout(() => {
    console.log("setTimeout.log.5.5");
  }, 500);
}, 500);

// 以上代码 会顺序执行 loq1 - log2 - log3 不会乱掉 为什么？
// 浏览器在执行的时候会调用内部api 一次添加到消息队列中，顺序执行

// 异步任务： 为异步任务划分优先级 - 宏任务 和微任务
// 宏任务和微任务执行时机不一样
// 宏任务：js脚本、UI渲染、setTimeout、网络请求、用户事件、messageChannel
// 微任务：Promise.then queueMicrotashk、MutationObserver(异步监控的dom变化)


/**
 * js 执行的顺序？ 先执行当前同步代码，再去执行异步代码，有一个单独的线程来扫描异步任务， 事件触发
 * 
 * 代码执行过程中会产生宏任务和微任务
 * 当前发生的宏任务事件到达的时候会被放入到宏任务队列中，宏任务只有一个队列
 * 微任务是立刻放到队列中（每次执行宏任务的时候会产生一个微任务队列）
 * 
 * 当前宏任务执行完毕后，会清空本轮产生的微任务，如果执行微任务的时候又产生了微任务，会被放到当前微任务队列尾部
 * 看一眼要不要渲染页面？要渲染就渲染(requestFrameAnimation requestAdleCallback) 刷新频率 16.6ms
 * 
 * 再去扫描宏任务队列，如果有则取出第一个宏任务，再去执行
 * 每次微任务都是执行一批，宏任务是一个
 * 
 * 
 * */  