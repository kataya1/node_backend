const http = require("http");

let s = new http.Server((req, res) => {
  res.statusCode = 200;
  // Set ContentType header to let client know we're sending plain text
  res.setHeader("Content-Type", "text/plain");

  // End the response by sending 'Hello World!' body content
  res.end("Hello World!");
});

s.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

server.timeout = 10000
server.maxHeadersCount = 2000

// Server events
server.on("connection", (socket) => {
  // New TCP stream
});

server.on("request", (req, res) => {
  // New HTTP request
});

server.on("close", () => {
  // Server closed
});

server.on("checkContinue", (req, res) => {
  // HTTP Expect: 100-continue
});

server.on("upgrade", (req, socket, head) => {
  // HTTP Upgrade
});

server.on("clientError", (err, socket) => {
  // Client connection error
});
