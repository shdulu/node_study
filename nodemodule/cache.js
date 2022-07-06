var a = 100;
var b = {
  a: 100,
};
setInterval(() => {
  a++;
  b.a++;
}, 2000);

module.exports = { a, b };
// 每 2 两种改变一次a的值，
