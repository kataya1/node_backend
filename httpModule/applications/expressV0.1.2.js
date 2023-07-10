// I'll start with a basic idea.
//  I'll have a hash map. that have the routes as a key. 
//  The value is an object with the functions corresponding to the methods. 
//  the functions of course take the req and res inputs.  
// --- v0.1.1
// Verify method 
// --- v0.1.2
// caller function: function that calls routes
// bugs: makerout function , trailing slashes 

// ------ next up ------
// - Handle errors centrally, like 404s. Handle 404 errors for undefined routes at the end.
// -  users/:id 

const http = require('http');
const path = require('path');
const URL = require('url')
const routes = new Map()


const makeRoute = (route) => {
    if (!routes.has(route)) {
        routes.set(route, {})
    }
    return routes.get(route)
}

const assign = (route, method, callback) => {
    if (!http.METHODS.includes(method.toUpperCase())) throw new Error('Unknown method')
    let obj = makeRoute(route)

    obj[method.toUpperCase()] = callback
}

assign('/', 'GET', (req, res) => {
    console.log('get /')
})

assign('/user', 'GET', (req, res) => {
    console.log('get /users')

})
assign('/user', 'POST', (req, res) => {
    console.log('post /users')
})
const caller = (req, res) => {
    try {

        let reqUrl = URL.parse(req.url, true)
        let method = req.method
        let pathName = reqUrl.pathname.replace(/\/$/, '') // normalization
        if (!routes.has(pathName)) throw new Error('404')
        let handler = routes.get(pathName)[method.toUpperCase()]
        handler(req, res)
    }
    catch (err) {
        res.end(err.message)
    }
}

const server = http.createServer((req, res) => {

    caller(req, res)
})

server.listen(3000, () => {
    console.log('listening ')
});
