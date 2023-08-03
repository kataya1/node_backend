const http = require('node:http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    console.log('Request: server callback request listener ')
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});
server.on('connection', () => {
    console.log('Connection: connection event')
    // The 'connection' event is emitted first when a new TCP connection is established with the server. 

})
server.on('request', (req, res) => {
    console.log('Request: on request event listener ')

})
server.on('upgrade', (req, socket, head) => {
    console.log('Upgrade: upgrade event')
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
        'Upgrade: WebSocket\r\n' +
        'Connection: Upgrade\r\n' +
        '\r\n');

    socket.pipe(socket); // echo back
});

// Now that server is running
server.listen(1337, () => {
    console.log('server is listening on port 1337')
    // make a request
    const options = {
        port: 1337,
        host: '127.0.0.1',
        headers: {
            'Connection': 'Upgrade',
            'Upgrade': 'websocket',
        },
    };

    // make upgrade request

    const req = http.request(options);
    req.end();

    req.on('upgrade', (res, socket, upgradeHead) => {
        console.log('got upgraded!');
        socket.end();

    });

    // try commenting this before running 
    http.get('http://localhost:1337', (res) => {
        res.on('data', (chunk) => {
            console.log('Response: ' + chunk);
            process.exit(0);
        });

    });
})

// It seems request listener doesn't trigger on upgrade event 

// server is listening on port 1337

// Connection: connection event
// Upgrade: upgrade event
// got upgraded!

// Connection: connection event
// Request: server callback request listener 
// Request: on request event listener 
// Response: okay

// ordering 
// connection 
// request or upgrade
//close 