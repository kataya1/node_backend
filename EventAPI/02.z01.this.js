// #### This #####

emitter.on('message', function () {
    console.log(this === emitter); // true
})



myEmitter.on('event', () => {
    console.log(this === emitter); // false
    // this will be undefined! 

});
// When emitting an event, you can pass arguments to the listener callbacks by supplying them after the event name. Inside the listener, those values are received as parameters so the callback can access the event data.

myEmitter.on('event', function () {
    console.log(this === myEmitter); // true

    // this will point to myEmitter
});