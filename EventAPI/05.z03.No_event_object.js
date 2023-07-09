import { EventEmitter } from 'node:events'
const emitter = new EventEmitter();

emitter.on('message', (event, message) => {
    console.log(event); // Event object
    console.log(message); // Data passed to emit()
});

emitter.emit('message', 'Hello World');

// nodes doesn't have the event object like in the browser