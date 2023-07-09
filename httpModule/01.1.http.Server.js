const http = require('http');

let s = new http.Server((req, res) => {
    res.statusCode = 200;
    // Set ContentType header to let client know we're sending plain text
    res.setHeader('Content-Type', 'text/plain');

    // End the response by sending 'Hello World!' body content  
    res.end('Hello World!');
})

s.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});