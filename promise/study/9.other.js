const MyPromise = require("./history/1.promise");
// const fs = require("fs");

// function readFile(...args) {
//   let dfd = MyPromise.deferred();
//   fs.readFile(...args, function (err, data) {
//     if (err) return dfd.reject(err);
//     dfd.resolve(data);
//   });
//   return dfd.promise;
// }

// readFile("a.txt", "utf8")
//   .then((data) => {
//     console.log(data, "111111111");
//     return readFile(data, "utf8");
//   })
//   .catch((err) => {
//     console.log(err, "2错");
//   })
//   .then((data) => {
//     console.log("333333 - then");
//   });

// MyPromise.reject("errorrrrr").catch((err) => {
//   console.log(err);
// });
// MyPromise.resolve(
//   new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("ok.....");
//     }, 1000);
//   })
// ).then((data) => {
//   console.log(data);
// });

const p1 = new Promise((resolve, reject) => {
  resolve("00000");
});

p1.then().finally(() => {

})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("10000");
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("20000");
  }, 2000);
});

Promise.all([p1, p2, p3])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err, "err");
  })
  .finally(() => {
    console.log("finally.....");
  });
