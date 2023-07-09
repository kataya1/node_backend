
import { EventEmitter } from 'node:events';





const myEmitter = new EventEmitter();




// Registers a listener for the 'event' event
myEmitter.on('event', () => {
    console.log('an event occurred!');

});



myEmitter.emit('event'); // Emits the 'event' event, which calls the listener