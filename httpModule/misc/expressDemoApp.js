const myExpress = require('./expressV0.2.1.js');

const { createServer, route } = myExpress;


// Create server
const server = createServer()


// Start server
server.listen(3000, () => {
    console.log('listening on port 3000')
});

const users = [
    {
        id: 1,
        name: 'John',
        posts: [
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' }
        ]
    },
    {
        id: 2,
        name: 'Jane',
        posts: [
            { id: 3, title: 'Post 3' }
        ]
    }
];

route('/', 'GET', (req, res) => {
    res.send('get /');
})

route('/', 'GET', (req, res, next) => {
    console.log('middleware 1')
    next()
}, (req, res) => {
    res.send('get /');
})

route('/users', 'GET', (req, res) => {

    res.json(users);

})
route('/users', 'POST', (req, res) => {
    // Create dummy user
    const user = {
        id: users.length + 1,
        name: 'New User'
    };

    users.push(user);

    res.json(user);
})
route('/users/:userId/posts/:postId', 'GET', (req, res) => {

    const { userId, postId } = req.params;

    const user = users.find(u => u.id === +userId);

    if (user) {
        const post = user.posts.find(p => p.id === +postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } else {
        res.status(404).send('User not found');
    }
});

// error routes
route('/error1', 'GET', (req, res) => {
    throw 418;
});

route('/error2', 'GET', (req, res) => {
    res.error(418, 'It\'s teatime bitch!');
});