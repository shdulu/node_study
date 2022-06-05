function say(who) {
  console.log("say", who);
}

Function.prototype.before = function (beforeSay) {
  return (...args) => {
    beforeSay();
    this(...args);
  };
};

let newSay = say.before(() => {
  console.log("say before");
});

newSay('我'); 
