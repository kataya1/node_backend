const ws = require('ws')


const client = new ws('ws://localhost:8080');
client.on('open', () => {
    console.log('Request Sec-WebSocket-Key:', client.requestHeaders['Sec-WebSocket-Key']);
});
client.on('error', err => {
    console.error('Error:', err);
});
client.on('open', () => {
    console.log('Connected!');
});

client.on('message', data => {
    console.log('Received:', data);
});


// curl -N -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==" -H "Sec-WebSocket-Version: 13" http://localhost:8080