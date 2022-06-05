// let about = null;
let p = new Promise((resolve, reject) => {
  // about = reject;
  setTimeout(() => {
    resolve("ok");
  }, 3000);
});

// setTimeout(() => {
//   // 这里并没有真的终端promise的执行
//   // 只不过抢先 执行reject
//   about("超时");
// }, 2000);

function withAbort(p) {
  // 借助 Promise.race 实现promise中断
  let abort = null;
  let myErrorPromise = new Promise((resolve, reject) => {
    abort = reject;
  });
  // race 有任何一个p
  romise失败就失败
  let returnPromise = Promise.race([p, myErrorPromise]);
  returnPromise.abort = abort
  return returnPromise
}
let promise2 = withAbort(p);

setTimeout(() => {
  promise2.abort('超时')
}, 2000)

promise2.then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err, "fail");
});
