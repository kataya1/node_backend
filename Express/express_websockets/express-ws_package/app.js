const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const WebSocket = require('ws');
const wss = expressWs.getWss();  // Get the WebSocket.Server instance
const wss2 = expressWs.getWss();

if (wss === wss2) console.log('🍅 true')
// prints 🍅 true

app.ws('/', (ws, req) => {
  console.log('Client connected to /');
  ws.send('Welcome!');
  ws.on('message', msg => {
    console.log(`/ Received: ${msg}`);
  });
});

app.ws('/echo', (ws, req) => {
  console.log('client connected on /echo')
  ws.on('message', msg => {
    console.log(`/echo Received: ${msg}`);
    ws.send(msg);
  });
});

app.ws('/room/:roomId', (ws, req) => {
  const roomId = req.params.roomId;

  ws.send('connected to room ' + roomId)
  ws.on('message', msg => {
    console.log(`Room ${roomId} received: ${msg}`);

    // broadcast message to other clients in room
    // where did wss come from ?
    wss.clients.forEach((client) => {
      // Handle each connected WebSocket client here
      // For example:
      // client.send('Hello client!');
      if (client.roomId === roomId) client.send(`room ${roomId}: ${msg}`)
    });
  });

  // track room id on connection
  ws.roomId = roomId;
});
app.listen(3000, () => {
  console.log('App listening on port 3000');
});