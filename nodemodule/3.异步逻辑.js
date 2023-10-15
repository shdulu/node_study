const fs = require("fs");
const path = require("path");

const person = {};

function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  };
}

let out = after(2, function () {
  console.log(person);
});

fs.readFile(path.resolve(__dirname, "a.txt"), "utf-8", function (err, data) {
  person.name = data;
  out();
});

fs.readFile(path.resolve(__dirname, "b.txt"), "utf-8", function (err, data) {
  person.age = data;
  out();
});
