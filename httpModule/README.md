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

### hope to do
- routing using http.server 
    - create a basic express library 
- (canceled) create a basic server class with a listen method (need node:net module) 
- (canceled) maybe write a basic ws library (probably gonna need to use sockets and node:net module)
- websockets on different routes


----- 
ServerResponse class

- response.getHeader(name): Get the value of a response header that has already been set.
- response.removeHeader(name): Remove a header that has already been set. 
- response.headersSent: Boolean indicating if the headers have been sent to the client yet. Useful for checking if you can still set/change headers.
- response.socket: The underlying socket handling the response. Useful for advanced use cases.
- response.connection: The Net.Socket object associated with the response.
- response.finished: Boolean indicating if the response has been finished (with res.end()).
- response.writableEnded: Boolean indicating if res.end() has been called.
- response.sendDate: Boolean indicating if the Date header will be automatically set. Default true.
- response.getHeaderNames(): Get an array of the names of the headers that have been set.

-----
IncomingMessage class

it's weird that the http documentation doesn't have the data event? in node:stream

1. http.ClientRequest and http.IncomingMessage inherit from stream.Readable, a readable stream class.
2. The stream.Readable class emits 'data' and 'end' events, which http.ClientRequest and http.IncomingMessage inherit.
[link](https://nodejs.org/docs/latest-v18.x/api/stream.html#class-streamreadable)


-----

i'm thinking that instead of writing ErrorHandler.send(res, 400);  we should have res.error(400, msg) i think this is a very nice approach but i need you to critique it. ofcoure now we need to extend the serverResponse class but the problem is that when we get the request event we already have instances of the original serverResponse class. we can ofcourse add methods and fields to these instances but i don't want it like that. how do we intercept the instantiation from the serverResponse class and make it instantiate from our modified class

I don't really know much about http.server huh! The past me already knew that that's why it wrote "create a basic server class with a listen method (need node:net module) " in the hope to do. 
i'll try to intercept the serverResponse object instantiation without diving into the node:net module

Skimming throw the node lib/http and lib/__http__server.js
too much

maybe the createServer function 

What!!!! createServer functions take options? OPTIONS can have IncomingMessage class (req) and ServerResponse class (res)

---
I have this code 
```js
const http = require('http');

class CustomResponse extends http.ServerResponse {

  error(status, message) {
    
    this.statusCode = status;
    
    if(!message) {
      message = http.STATUS_CODES[status]; 
    }
    
    this.setHeader('Content-Type', 'application/json');
    this.writeHead(status, message); 
    
    this.end(JSON.stringify({
      status,
      message
    }));

  }

}

const server = http.createServer({
  ServerResponse: CustomResponse
}, (req, res) => {

  res.error(500); // Uses STATUS_CODES message

});
```i'm wondering if res.error() should just emit the error event the i would add an event listener for the error event to the server. would that be better?