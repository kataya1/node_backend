 the full set of 6 key classes exported by the http module is:


- Server - Represents an HTTP server. Commonly instantiated to create a server with http.createServer().

- Agent - Manages connection persistence and pooling for HTTP clients. Not commonly used directly.

- ClientRequest - Represents an outgoing HTTP request. Created by http.request().

- IncomingMessage - Represents an incoming HTTP request. Passed to the createServer() callback. Very commonly used. (req)

- ServerResponse - Represents an HTTP response the server will return. Passed to createServer() callback. Very commonly used.  (res)

- OutgoingMessage - Base prototype for ClientRequest and ServerResponse. Rarely used directly.

plans:

- i'll ignore the agent class for now it seems to be the hardest and the lowest level 

node:net module is low level sockets. you can use it to build http or websockets. i think. it's like the python udp and tcp sockets that i built 



### hope to do

- create a basic server class with a listen method
- create a basic express library 
- maybe write a basic ws library 

- websockets on different routes


------------
 Here are some of the common events you can listen for on an HTTP server created with http.createServer() in Node.js:

- 'request' - Emitted each time the server gets an HTTP request from a client. This is the main event used to handle incoming requests. The callback gets passed the http.IncomingMessage and http.ServerResponse objects.

- 'connection' - Emitted when a new TCP connection is established to the server. The callback receives the socket object.

- 'close' - Emitted when the server closes. No callback.

- 'checkContinue' - Emitted when the server receives a HTTP Expect: 100-continue request. Used to send a interim 100 response.

- 'connect' - Emitted for each incoming HTTP CONNECT request. Used for tunneling. 

- 'upgrade' - Emitted when client requests upgrade of the HTTP connection, such as to WebSocket.

- 'clientError' - Emitted if a client connection emits an 'error' event. 


**When creating an HTTP server with http.createServer() in Node.js, you can handle incoming requests in two ways**
http.createServer([options][, requestListener])
The requestListener is a function which is automatically added to the 'request' event.
1. By passing a callback function to http.createServer():

```js
const server = http.createServer((req, res) => {
  // handle request
});
```

2. By listening to the 'request' event: 

```js
const server = http.createServer();

server.on('request', (req, res) => {
  // handle request
});
```


----

server events 

The 'connection' event is emitted first when a new TCP connection is established with the server. 
It seems request event listener doesn't trigger on upgrade event

**ordering**
- connection 
- request or upgrade
- close 