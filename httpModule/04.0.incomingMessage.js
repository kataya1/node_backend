
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const headers = req.headers
    const method = req.method;
    const reqUrl = url.parse(req.url, true);
    const pathName = reqUrl.pathname; //string
    const query = reqUrl.query; // obj
    const [statusCode, statusMessage] = [req.statusCode, req.statusMessage] //?
    console.log('method:', method)
    console.log('pathname:', pathName)
    console.log('query', query)
    let body = '';
    req.on('data', (chunk) => {
        // stream data chunks
        body += chunk;
        console.log('Received data:', chunk);
    });
    // it's weird that the http documentation doesn't have the data event? in node:stream the class extendes stream.readable
    req.on('end', () => {
        // full body received  
        console.log('Request body ended');
        // parse body
        const parsedBody = JSON.parse(body);
        console.log(parsedBody)
        res.end(body)
    });

    req.on('close', () => {
        console.log('Client disconnected');
    });

});


server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});