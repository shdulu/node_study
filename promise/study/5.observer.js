class Subject {
  // 被观察者 需要一个自身状态，状态变化了要通知所有的观察者
  constructor(name) {
    this.name = name;
    this.observers = []; //  记录那些人观察了它
    this.state = "开心的在玩耍"; // 当前状态 - 状态变更通知观察者更新
  }
  attach(o) {
    this.observers.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.observers.forEach((o) => o.update(this));
  }
}


class Observer {
  // 观察者
  constructor(name) {
    this.name = name;
  }
  update(s) {
    console.log(this.name + ":" + s.name + ":" + s.state);
  }
}

let s = new Subject("小宝宝");
let o1 = new Observer("爸爸");
let o2 = new Observer("妈妈");

// 订阅模式
s.attach(o1);
s.attach(o2);

s.setState("有人咬我，不开心");


module.exports = Subject