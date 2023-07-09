// a basic EventEmitter class in JavaScript:

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  }
}


const emitter = new EventEmitter();

emitter.on('someEvent', (x, y) => {
  console.log(x, y);
});

emitter.emit('someEvent', 1, 2); // Prints 1 2

const listener = (x, y) => console.log(x, y);
emitter.on('otherEvent', listener);

emitter.off('otherEvent', listener);
emitter.emit('otherEvent', 10, 20); // Nothing prints