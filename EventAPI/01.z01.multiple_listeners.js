// Asynchronous vs. synchronous
import { EventEmitter } from 'node:events';


// All objects that emit events are instances of the EventEmitter class. These objects expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object.
class MyEmitter extends EventEmitter { } // Inherits from EventEmitter
// const myEmitter =  new EventEmitter()
const myEmitter = new MyEmitter();
// When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously.
myEmitter.on('event', () => { // Registers a listener for the 'event' event
    console.log('an event occurred!');

}, () => {
    console.log('second event(not actually attached - doesn\'t work)')
});

myEmitter.on('event', () => {
    console.log('third event');
});


myEmitter.emit('event'); // Emits the 'event' event, which calls the listener