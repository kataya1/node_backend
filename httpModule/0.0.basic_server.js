// Require the http module to access Node.js HTTP server functionality 
const http = require('http');

// Use http.createServer() constructor to create an HTTP server instance
// This accepts a callback function containing the server logic
const server = http.createServer((req, res) => {
    //     - req - This is an instance of http.IncomingMessage. It represents the incoming HTTP request and has properties/methods for accessing the request details like URL, headers, etc.

    // - res - This is an instance of http.ServerResponse. It represents the outgoing HTTP response and has properties/methods for sending data to the client and setting headers, status code, etc. 
    // Set response status code to 200 (OK) to indicate a successful response

    // Get request method 
    const method = req.method;

    // Get request URL 
    const url = req.url;
    console.log(req.headers)

    res.statusCode = 200;
    // Set Content-Type header to let client know we're sending plain text
    res.setHeader('Content-Type', 'text/plain');

    // End the response by sending 'Hello World!' body content  
    res.end('Hello World!');
});

// Start the server listening on port 3000 on the local machine
// Use a callback to log a message when the server is ready
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});