// ServerResponse (res) - Represents an HTTP response the server will return. Passed to createServer() callback. Very commonly used.  (res)
const http = require('http');

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain'); // header
    res.statusCode = 200;

    res.writeHead(200, { 'Content-Type': 'text/plain' }); // status code and header
    res.write('Hello ');
    res.write('world!');

    //json 
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ name: 'John' })); // sends 

    // res.send() // doesn't exist here (added in express)
    // res.json() // doesn't exist here (added in express)

    res.end(); // ends and sends the response
}).listen(3000);


(req, res) => {
    // redirect the response 
    res.statusCode = 301;
    res.setHeader('Location', '/new-url');
    res.end();
}

// - response.getHeader(name): Get the value of a response header that has already been set.
// - response.removeHeader(name): Remove a header that has already been set. 
// - response.headersSent: Boolean indicating if the headers have been sent to the client yet. Useful for checking if you can still set/change headers.
// - response.socket: The underlying socket handling the response. Useful for advanced use cases.
// - response.connection: The Net.Socket object associated with the response.
// - response.finished: Boolean indicating if the response has been finished (with res.end()).
// - response.writableEnded: Boolean indicating if res.end() has been called.
// - response.sendDate: Boolean indicating if the Date header will be automatically set. Default true.
// - response.getHeaderNames(): Get an array of the names of the headers that have been set.