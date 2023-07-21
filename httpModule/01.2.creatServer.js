const http = require('http');

class CustomIncomingMessage extends http.IncomingMessage {
    // custom incoming request class
}

class CustomServerResponse extends http.ServerResponse {
    // custom server response class  
}

const options = {
    // Custom IncomingMessage class
    IncomingMessage: CustomIncomingMessage,

    // Custom ServerResponse class
    ServerResponse: CustomServerResponse,
    // Send these headers only once
    uniqueHeaders: [
        'X-Custom-Header',
        'Cache-Control'],
    // Check for request timeouts every 30 seconds
    connectionsCheckingInterval: 30000,

    // Timeout requests after 60 seconds
    headersTimeout: 60000,

    // Set highWaterMark to control buffering
    highWaterMark: 1024,

    // Allow invalid HTTP headers
    insecureHTTPParser: true,

    // Join duplicate headers with ',' 
    joinDuplicateHeaders: true,

    // Enable keep-alive on new sockets
    keepAlive: true,

    // Initial keepalive delay of 5 seconds  
    keepAliveInitialDelay: 5000,

    // Timeout idle keep-alive sockets after 10 seconds
    keepAliveTimeout: 10000,

    // Maximum 16KB header size
    maxHeaderSize: 16384,

    // Disable Nagle's algorithm
    noDelay: true,

    // Timeout requests after 5 minutes
    requestTimeout: 300000,

    // Require Host header
    requireHostHeader: true,

    // Send these headers only once
    uniqueHeaders: ['Content-Type', 'Content-Length']
};

// This will ensure that the 'X-Custom-Header' and 'Cache-Control' response headers are only sent once in the response, even if they are explicitly set multiple times.

// If the header value is set to an array, it will join the values using a ';' separator.

// For example:

// ```js
// res.setHeader('X-Custom-Header', ['value1', 'value2']);

// // Header will be sent as:
// // X-Custom-Header: value1;value2

const server = http.createServer(options, (req, res) => {
    // req will be an instance of CustomIncomingMessage
    // res will be an instance of CustomServerResponse
    res.setHeader('X-Custom-Header', ['value1', 'value2']);

    res.end('Hello World');
});


server.listen(3000);