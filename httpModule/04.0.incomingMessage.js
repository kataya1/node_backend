
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    const method = req.method;
    const reqUrl = url.parse(req.url, true);
    const pathName = reqUrl.pathname; //string
    const query = reqUrl.query; // obj
    console.log('method:', method)
    console.log('pathname:', path)
    console.log('query', query)

    req.on('data', (chunk) => {
        // stream data chunks
    });

    req.on('end', () => {
        // full body received  
    });
    res.statusCode = 200;
    // Set Content-Type header to let client know we're sending plain text
    res.setHeader('Content-Type', 'text/plain');

    // End the response by sending 'Hello World!' body content  
    res.end('Hello World!');
});


server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});