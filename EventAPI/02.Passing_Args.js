// Passing arguments and this to listeners 
import { EventEmitter } from 'node:events'
const myEmitter = new EventEmitter()
myEmitter.on('event', (a, b) => {
    console.log('listener1:', a, b);
});

myEmitter.on('event', (c, d) => {
    console.log('listener 2:', c, d);
});

myEmitter.emit('event', 'arg1', 'arg2');
// Prints:
// arg1 arg2

