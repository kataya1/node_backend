const myExpress = require('./expressV0.1.6.js');

const { IncomingMessage, ServerResponse, createServer, assign } = myExpress;


// Create server
const server = createServer()


// Start server
server.listen(3000, () => {
    console.log('listening on port 3000')
});

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
];
assign('/', 'GET', (req, res) => {
    res.send('get /');
})

assign('/users', 'GET', (req, res) => {

    res.json(users);

})
assign('/users', 'POST', (req, res) => {
    // Create dummy user
    const user = {
        id: users.length + 1,
        name: 'New User'
    };

    users.push(user);

    res.json(user);
})
assign('/users/:userId/posts/:postId', 'GET', (req, res) => {

    res.json(req.params);
});

// error routes
assign('/error1', 'GET', (req, res) => {
    throw 418;
});

assign('/error2', 'GET', (req, res) => {
    res.error(418, 'It\'s teatime bitch!');
});