class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(eventName, callback) {
    if (!this._events) this._events = {};
    if (eventName !== "newListener") {
      this.emit("newListener", eventName);
    }

    let events = this._events[eventName] || [];
    events.push(callback);
    this._events[eventName] = events;
  }
  emit(eventName, ...args) {
    if (!this._events) this._events = {};
    let callbacks = this._events[eventName];
    callbacks && callbacks.forEach((cb) => cb.call(this, ...args));
  }
  once(eventName, callback) {
    function one() {
      callback();
      this.off(eventName, one);
    }
    one.l = callback;
    this.on(eventName, one);
  }
  off(eventName, callback) {
    if (!this._events) this._events = {};
    this._events[eventName] = this._events[eventName].filter(
      (fn) => fn !== callback && fn.l !== callback
    );
  }
}

module.exports = EventEmitter