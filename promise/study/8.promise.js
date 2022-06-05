const MyPromise = require("./history/1.promise");

let p1 = new MyPromise((resolve, reject) => {
  resolve();
});

let p2 = p1.then(() => {
  // return p2
  // return 100;
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        new MyPromise((resolve, reject) => {
          setTimeout(() => {
            resolve("100000");
          }, 3000);
        })
      );
    }, 1000);
  });
});

p2.then(
  (data) => {
    console.log(data, "s");
  },
  (err) => {
    console.log(err, "f");
  }
);
