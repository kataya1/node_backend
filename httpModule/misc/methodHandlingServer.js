
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Get the URL parameters
        const { query } = url.parse(req.url, true);

        // Respond with params
        res.end(JSON.stringify(query));

    } else if (req.method === 'POST') {

        // Get request body data
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            // Respond with request body
            res.end(JSON.stringify(data));
        });

    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(3000);
