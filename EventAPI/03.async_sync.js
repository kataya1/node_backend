// Asynchronous vs. synchronous

// How is setImmediate() different from setTimeout(() => {}, 0) (passing a 0ms timeout), and from process.nextTick() and Promise.then()?



// When appropriate, listener functions can switch to an asynchronous mode of operation using the setImmediate() or process.nextTick() methods

import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('this happens asynchronously');
    });
});
myEmitter.emit('event', 'a', 'b');


// Event loop executes tasks in process.nextTick queue first, and then executes promises microtask queue, and then executes macrotask queue. (nope nope, not anymore)
const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');
const start = () => {
    console.log('start');
    setImmediate(baz);
    new Promise((resolve, reject) => {
        resolve('bar');
    }).then((resolve) => {
        console.log(resolve);
        process.nextTick(zoo);
    });
    process.nextTick(foo);
};
start();

// should be
`
start
foo
bar
zoo
baz
`

    // i'm getting// maybe because the promise is resolving immediately 
    `
start
bar
foo
zoo
baz
`
// ######################
// ######################
setTimeout(console.log, 0, 'timout callback')

setImmediate(() => {
    console.log('immediate callback');
});

process.nextTick(() => {
    console.log('nextTick callback');
});

Promise.resolve('promise tick').then(console.log)

console.log('this is synchronous');

// this is synchronous
// promise tick
// nextTick callback
// immediate callback
// timout callback