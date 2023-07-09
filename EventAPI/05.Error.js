import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

// If an EventEmitter does not have at least one listener registered for the 'error' event, and an 'error' event is emitted, the error is thrown, a stack trace is printed, and the Node.js process exits.
myEmitter.on('error', (err) => {
    console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
// Prints: whoops! there was an error

// #####################

// t is possible to monitor 'error' events without consuming the emitted error by installing a listener using the symbol events.errorMonitor.

myEmitter.on(errorMonitor, (err) => {
    MyMonitoringTool.log(err);
});
myEmitter.emit('error', new Error('whoops!'));
// Still throws and crashes Node.js

// what does consume mean?
