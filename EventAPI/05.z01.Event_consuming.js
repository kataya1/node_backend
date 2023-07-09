// An "event consumer" refers to code that listens for and responds to emitted events. When code "consumes" an event, it means it handles the event by executing a callback function when the event is emitted.

// Consume the 'close' event by attaching a listener 
process.on('close', () => {
    console.log('Process closed!');
});

// Consume the 'data' event from a readable stream
const stream = fs.createReadStream('file.txt');
stream.on('data', chunk => {
    console.log('New chunk!');
});

// Consume the Promise 'resolve' event 
// somePromise.then(value => {
//     // Handle promise resolution  
// });

// Consume error events 
httpServer.on('error', err => {
    console.log('Error occurred!');
});

// does resolve() function in promise emit a 'resolve' event !!!!!!!?????