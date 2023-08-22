// server
const net = require('net');

const server = net.createServer((socket) => {
  socket.write('Hello client!\n');
  socket.on('data', (data) => {
    console.log(data.toString());
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});

// Client

const net = require('net');

// Create a new socket instance
const clientSocket = new net.Socket();

clientSocket.connect(8080, '127.0.0.1', () => {
  console.log('Connected to the server!');
  clientSocket.write('Hello from client!');
});

clientSocket.on('data', (data) => {
  console.log('Received from server:', data.toString());
  clientSocket.destroy();  // Close the socket after receiving data
});

clientSocket.on('close', () => {
  console.log('Connection closed');
});

clientSocket.on('error', (err) => {
  console.error('Error:', err.message);
});
