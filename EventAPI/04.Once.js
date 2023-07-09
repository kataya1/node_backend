// Handling events only once

import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter { }
const emitter = new MyEmitter();

// learned:
// emitter.once
// emitter.off

// ######################
// 1.   Use a variable to track if it's been called:
let called = false;
emitter.on('event', () => {
    if (!called) {
        // do something
        called = true;
    }
});
// ######################


// ######################
// 2. Unbind the listener after it's called:

const handler = () => {
    // do something
    emitter.off('event', handler);
};

emitter.on('event', handler);
// ######################


// ######################
// 3. Use `once()` instead of `on()`:


emitter.once('event', () => {
    // do something
});
// ######################


