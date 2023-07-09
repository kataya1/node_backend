**How is setImmediate() different from setTimeout(() => {}, 0) (passing a 0ms timeout), and from process.nextTick() and Promise.then()?**

A setTimeout() callback with a 0ms delay is very similar to setImmediate(). The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.

A process.nextTick callback is added to process.nextTick queue. A Promise.then() callback is added to promises microtask queue. A setTimeout, setImmediate callback is added to macrotask queue.
**not true in practices**
Event loop executes tasks in process.nextTick queue first, and then executes promises microtask queue, and then executes macrotask queue. 

```js
setTimeout(console.log, 0, 'timout callback')

setImmediate(() => {
    console.log('immediate callback');
});

process.nextTick(() => {
    console.log('nextTick callback');
});

Promise.resolve('promise tick').then(console.log)

console.log('this is synchronous');
```
// this is synchronous
// promise tick
// nextTick callback
// immediate callback
// timout callback