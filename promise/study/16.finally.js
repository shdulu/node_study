Promise.resolve("123")
  .finally((...args) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("100");
      }, 1000);
    });
  })
  .then((data) => {
    console.log("success", data);
  })
  .catch((err) => {
    console.log("err", err);
  });
