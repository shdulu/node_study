function EventEmitter() {
  this._events = {};
}
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) this._events = {};

  // 在绑定不是 newListener 的时候，会优先触发 newListener 事件，并将参数传递
  if (eventName !== "newListener") {
    this.emit("newListener", eventName);
  }

  let events = this._events[eventName] || [];
  events.push(callback);
  this._events[eventName] = events;
};
EventEmitter.prototype.emit = function (eventName, ...args) {
  if (!this._events) this._events = {};
  let callbacks = this._events[eventName];
  callbacks && callbacks.forEach((cb) => cb.call(this, ...args));
};
EventEmitter.prototype.once = function (eventName, callback) {
  function one() {
    callback();
    // 绑定one 函数，要在one执行一次之后清除绑定
    this.off(eventName, one);
  }
  one.l = callback; // 增加标识
  this.on(eventName, one);
};
EventEmitter.prototype.off = function (eventName, callback) {
  if (!this._events) this._events = {};
  this._events[eventName] = this._events[eventName].filter(
    (fn) => fn !== callback && fn.l !== callback
  );
};

module.exports = EventEmitter;
