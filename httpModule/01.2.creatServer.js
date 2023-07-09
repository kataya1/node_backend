const http = require('http');

class CustomIncomingMessage extends http.IncomingMessage {
    // custom incoming request class
}

class CustomServerResponse extends http.ServerResponse {
    // custom server response class  
}

const options = {
    IncomingMessage: CustomIncomingMessage,
    ServerResponse: CustomServerResponse,
    uniqueHeaders: [
        'X-Custom-Header',
        'Cache-Control']
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