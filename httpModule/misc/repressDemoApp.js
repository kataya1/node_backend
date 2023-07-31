const myExpress = require('./expressV0.2.2.js');
const cors = require('cors');
const { createServer, route, use } = myExpress;
const { routes, paramRouteResolver, getRouteFromURL } = myExpress;
use(cors())

const middleware1 = (req, res, next) => {
    process.stdout.write('mw1👉');
    next();
}
const middleware2 = (req, res, next) => {
    process.stdout.write('mw2👉 ');
    next();
}
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${Date.now()}`);
    next();
}
use([middleware1, middleware2])
use(logger)

// custom 404 that works 50% of the time
use((req, res, next) => {
    let route = getRouteFromURL(req.url)
    if (!routes.has(paramRouteResolver(getRouteFromURL(req.url)).paramRoute)) {
        res.error(400, `🤷‍♀️ ${route} not found`)
        return
    }
    next()

})

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

const removePosts = (req, res, next) => {
    const modifiedUsers = users.map(user => {
        const { posts, ...rest } = user;
        return rest;
    });

    // persist state/info from one middleware to the next
    res.locals.users = modifiedUsers
    req.users = modifiedUsers;

    next();
}

route('/users', 'GET', removePosts, (req, res) => {

    // res.json(req.users);
    res.json(res.locals.users)

})

route('/users', 'POST', (req, res) => {
    // Create dummy user
    const user = {
        id: users.length + 1,
        name: 'New User',
        posts: []
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