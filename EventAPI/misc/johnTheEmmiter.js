class Person extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    sayHello(msg) {
        console.log(`${this.name} says: ${msg}`);
    }
}

const john = new Person('John');

john.on('speak', function (msg) {
    this.sayHello(msg);
});

john.emit('speak', 'Hi!');
  // Prints:
  // John says: Hi!

