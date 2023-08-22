a library that is prerequisit to http

**net makes TCP sockets only**

**use dgram for UDP sockets**

net.Socket

- Extends: <stream.Duplex>

can be created by the user and used directly to interact with a server. For example, it is returned by net.createConnection(), so the user can use it to talk to the server.

Socket. It can also be created by Node.js and passed to the user when a connection is received. For example, it is passed to the listeners of a 'connection' event emitted on a net.Server, so the user can use it to interact with the client.

```js
const server = net.createServer((socket) => {
```

net.createConnection()
alias to net.connect() 
A factory function, which creates a new net.Socket, immediately initiates connection with socket.connect(), then returns the net.Socket that starts the connection.

```js
const client = net.createConnection({ port: 8124 }, () => {
  // 'connect' listener.
  console.log("connected to server!");
  client.write("world!\r\n");
});
```

net.createConnection() = new net.socket.connect = net.createSocket().connect()

| Feature/Functionality      | Python's `socket`                                             | Node's `net.Socket`                                                                                      |
| -------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Library Import**         | `import socket`                                               | `const net = require('net');`                                                                            |
| **Create Socket**          | `s = socket.socket()`                                         | `const socket = new net.Socket();`                                                                       |
| **Bind to Address**        | `s.bind((host, port))`                                        | Used within `net.createServer()` for TCP. For direct binding in client, use `socket.connect(port, host)` |
| **Listen for Connections** | `s.listen()`                                                  | `server.listen(port, host)` (where `server` is created using `net.createServer()`)                       |
| **Accept Connection**      | `conn, addr = s.accept()`                                     | Event-based: `server.on('connection', (socket) => {...})`                                                |
| **Connect to Server**      | `s.connect((host, port))`                                     | `socket.connect(port, host)`                                                                             |
| **Send Data**              | `s.send(data)`                                                | `socket.write(data)`                                                                                     |
| **Receive Data**           | `data = s.recv(buffer_size)`                                  | Event-based: `socket.on('data', (data) => {...})`                                                        |
| **Close Socket**           | `s.close()`                                                   | `socket.end()` for gracefully closing, `socket.destroy()` for forceful termination                       |
| **Error Handling**         | Typical Python error handling using `try` and `except`        | Event-based: `socket.on('error', (err) => {...})`                                                        |
| **Non-blocking Mode**      | Using methods like `settimeout` or libraries like `selectors` | Natively asynchronous and event-driven                                                                   |
| **TCP/UDP**                | Both TCP and UDP are handled by the `socket` library          | TCP is primarily handled with `net`. For UDP, use the `dgram` module                                     |
