Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        // then 中的回调返回一个promise，会等待这个promise完成，promise.resole.then()
        // 在ECMA中，如果then中的回调返回了一个promise，那么会自动再次产生一个then
        return Promise.resolve();
      })
      .then(() => {
        // 这里要等待 then1-1成功才会注册
        console.log("then1-2");
      });
    // return undefined  -- 这里相当于
  })
  .then(() => {
    // 这里的回调需要等待 上一个then执行完毕才会执行
    console.log("then2");
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  })
  .then(() => {
    console.log("then5");
  });

// then1 -> then1-1 -> 空then

// then1 then1-1 then2 then3 then4 then1-2 then5
// 微任务执行过程：先进先出，当前微任务在执行过程中会将产生的微任务放到当前微任务队列的尾部
// then1 打印后 直接当前的promise就成功了，并且注册了一个then1-1的promise

// 1. js代码执行 产生一个宏任务
// 2. 最外层 Promise 回调 then 产生一个微任务 执行打印then1
// 3. 在then1 立即又执行了了一个Promise，Promise回调是一个新的微任务，then1-1
// 4. 执行打印 then1-1后
// 放入到微任务队列
