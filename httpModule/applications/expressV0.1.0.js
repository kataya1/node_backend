// I'll start with a basic idea.
//  I'll have a hash map. that have the routes as a key. 
//  The value is an object with the functions corresponding to the methods. 
//  the functions of course take the req and res inputs.  

// next up
// - Handle errors centrally, like 404s. 
// -  users/:id 
const http = require('http');

const routes = new Map()
const server = http.createServer((req, res) => {
    const http = require('http');

})

const makeRoute = (route) => {
    routes.set('/', {
    })

    return routes[route]
}

const assign = (route, method, func) => {
    let obj = makeRoute(route)
    obj[method.toUpperCase()] = func
}

assign('/', 'GET', (req, res) => {

})

assign('/users', 'GET', (req, res) => {

})
assign('/users', 'POST', (req, res) => {

})
server.listen(3000);
