
// Server
const dgram = require('dgram');
const server = dgram.createSocket('udp4');  // 'udp4' indicates using IPv4

server.on('message', (msg, rinfo) => {
  console.log(`Server received: ${msg} from ${rinfo.address}:${rinfo.port}`);
  server.send(
      'ACK', rinfo.port,
      rinfo.address);  // Send an acknowledgment to the client
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(8124);  // Listening on port 8124


// Client
const dgram = require('dgram');
const message = Buffer.from('Hello, server!');
const client = dgram.createSocket('udp4');

client.send(message, 8124, '127.0.0.1', (err) => {
  if (err) console.error(err);
  console.log('UDP message sent');
});

client.on('message', (msg, rinfo) => {
  console.log(`Client received: ${msg} from ${rinfo.address}:${rinfo.port}`);
  client.close();  // Close the client after receiving a message from the server
});

client.on('error', (err) => {
  console.error('Error:', err);
});

//
