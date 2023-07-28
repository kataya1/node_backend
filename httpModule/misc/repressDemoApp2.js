const { use, route, createServer } = require('./expressV0.2.1');

const app = createServer();

use((req, res, next) => {
    console.log('Middleware 1');
    next();
})

use((req, res, next) => {
    console.log('Middleware 2');
    next();
})

route('/', 'get', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


route('/user', 'GET', (req, res, next) => {
    console.log('Route middleware');
    next();
}, (req, res) => {
    console.log('User handler');
    res.send('User page');
});

