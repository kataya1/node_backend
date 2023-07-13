// I'll start with a basic idea.
//  I'll have a hash map. that have the routes as a key. 
//  The value is an object with the functions corresponding to the methods. 
//  the functions of course take the req and res inputs.  
// --- v0.1.1
// Verify method 
// --- v0.1.2
// caller function: function that calls routes
// bugs: makerout function , trailing slashes 
// - Handle errors centrally, like 404s. Handle 404 errors for undefined routes at the end.
// ------ next up ------
// -  users/:id 


const http = require('http'); // Import Node.js core http module
const path = require('path'); // Import path module 
const URL = require('url') // Import url module for URL parsing

const routes = new Map() // Create a Map to store the routes

// Trie node 
class TrieNode {
    // create a trie data structure .this trie is only gonna be filled when the assign function find a ":" in the route we're assigning. we will split the route on "/". each of the elements separated will be the data a node. and ofcourse the earlier element is the parent of the later element. for example /user/:user_id/message/:message_id. will be user -> user_id -> message -> message_id. i think the trie will have four field "type" which can be either "path" or "param", data which is gonna be the element name like "user_id" or "user" and next. it should also have a field called matchRE. in case of the path type it will be the name user, and in case of the param it will be an alphanumeric matching regular expression something like /^\w+$/
    constructor(type, data) {
        this.type = type; // 'param' or 'path'
        this.data = data;
        this.children = {}; // child nodes
        this.matchRE = type === 'param' ? /^\w+$/ : data; // match regex
    }
}

// Trie to store routes  
const routeTrie = new TrieNode('root', '/');

// Insert route into trie
function paramRoutePrep(route) {
    // a new function routePrep which will be used within the assign function to save the routes in the trie.
    const parts = route.split('/');

    let currNode = routeTrie;
    for (let part of parts) {
        if (part.startsWith(':')) {
            // Parameter node
            currNode.children[part] = new TrieNode('param', part.slice(1));
        } else {
            // Static path node
            currNode.children[part] = new TrieNode('path', part);
        }
        currNode = currNode.children[part];
    }
}

// Function to ensure route exists in routes Map
// If not, create it and return it  
const makeRoute = (route) => {
    if (!routes.has(route)) {
        routes.set(route, {})
    }

    return routes.get(route)
}

// Assign a callback to a route + method combination
const assign = (route, method, callback) => {
    if (!http.METHODS.includes(method.toUpperCase())) throw new Error('Unknown method')
    if (route.includes(":")) paramRoutePrep(route)
    let obj = makeRoute(route) // Get route object

    obj[method.toUpperCase()] = callback // Assign callback 
}

// --------- Example route handlers ---------- 
assign('/', 'GET', (req, res) => {
    console.log('get /')
})

assign('/user', 'GET', (req, res) => {
    console.log('get /users')

})
assign('/user', 'POST', (req, res) => {
    console.log('post /users')
})
assign('/user/:userId/post/:postId', 'GET', (req, res) => {
    console.log('/user/:userId/post/:postId')
    console.log(req.params)
});

// ------------
const routeResolver = (pathName) => {

    // pathName = "/user/123/post/31a"
    // imagine a function called routeResolver that takes pathName as input and the return (string) is assigned to a route variable. for example the function will take "/user/12" and return "/user/:id" .this function is called inside the caller function and the return will be the route checked to see if it's contained in the routes map. i'm thinking this function needs to return params as well, since well need to know what the id is.

    let route;
    let params = {};
    return { route, params }
}


// Route handler function  
const caller = (req, res) => {
    try {
        let reqUrl = URL.parse(req.url, true) // Parse request URL
        let method = req.method // Get request method
        let route = reqUrl.pathname.replace(/\/$/, '') || '/' // Normalize pathname
        let params = {};
        if (!routes.has(route)) {
            let { route, params } = routeResolver(pathName) || {};
            if (!route) throw '404'
        }

        req.params = params

        let handler = routes.get(pathName)[method.toUpperCase()] // Get route handler
        handler(req, res) // Call handler

    } catch (err) {
        res.end(err.message) // Send error message
    }
}

// Create server
const server = http.createServer((req, res) => {

    caller(req, res) // Handle all requests
})

// Start server
server.listen(3000, () => {
    console.log('listening ')
});