const express = require('express');
const http = require('node:http')
const {WebSocketServer} = require('ws');

const app = express();

// mapping routeName to Id Map. example: key: "room" , value: { 123: WSS, 44,
// WSS}
const routeNameToIdMap = new Map()

// mapping room id to the websocket server instance of that room example "123 ->
// WSS "
routeNameToIdMap.set('room', new Map())  // initializing the "/room" route

// Start the Express app and the WebSocket server.
let server = app.listen(8000, () => {
  console.log('Listening on port 8000');
});

// http server listens for the ugrade event
server.on('upgrade', (req, socket, head) => {
  // spliting /room/123 to ["", "room", "123"]
  let [_, routeName, id] = req.url.split('/')

  // if the routeName doesn't exist, end the socket
  if (!routeNameToIdMap.has(routeName)) {
    socket.end()
    return
  }
  // get the map mapping the room id to the webSocketServer instance
  let roomIdToWSSMap = routeNameToIdMap.get(routeName)
  // if a room with that id exists
  if (roomIdToWSSMap.has(id)) {
    // get the webSocketServer instance
    const wss = roomIdToWSSMap.get(id)
    wss.handleUpgrade(
        req, socket, head, (ws) => {wss.emit('connection', ws, req)})
  }
  else {
    // create a new WebSocketServer instance
    const wss = new WebSocketServer({noServer: true})

    roomIdToWSSMap.set(id, wss)
    // listen for connection event
    wss.on(
        'connection',
        ws => {// when a message is recieved from a client
               ws.on('message', (data) => {
                 console.log('recieved message: ' + data)
                 //  broadcast this message to all other clients in the
                 //  webSocketServer
                 Array.from(wss.clients).forEach(client => {client.send(data)});
               })})
    // respond
    wss.handleUpgrade(
        req, socket, head, ws => {wss.emit('connection', ws, req)})
  }
})
