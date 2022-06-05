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
