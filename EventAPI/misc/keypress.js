import EventEmitter from 'events';

class KeypressEmitter extends EventEmitter { }

const ke = new KeypressEmitter();

process.stdin.on('data', (chunk) => {
    ke.emit('keypress', chunk);
});

ke.on('keypress', (key) => {
    console.log(`Key pressed: ${key.toString()}`);
});

process.stdin.setRawMode(true);
process.stdin.resume();

console.log('Press any key...');