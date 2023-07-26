//  I'll start with a basic idea.
//  I'll have a hash map. that have the routes as a key. 
//  The value is an object with the functions corresponding to the methods. 
//  the functions of course take the req and res inputs.  
// --- v0.1.1
// Verify method 
// --- v0.1.2
// caller function: function that calls routes
// bugs: makerout function , trailing slashes 
// - Handle errors centrally, like 404s. Handle 404 errors for undefined routes at the end.
// --- V.0.1.3
// users/:id URL Parameters ( TrieNode, buildParamRouteTree, paramRouteResolver)
// --- V.0.1.4
// ERROR HANDLING (after deleperation we made res.error(status, message?))
// --- V.0.1.5
// extending http.ServerResponse to have res.json() and res.send()
// --- v.0.1.6
// module, export assign, (how do you make the user create a server using the custom classes? export a custom createServer?, what if he wanted to pass his own options, does express expose it's own custom incomingMessage class, serverResponse class?)
// "if (require.main === module)" so that the builtin server app wont run when an external code import the module
// --- v.0.2.0  
// renaming "assign" to "route", removing the builtin server app, added res.status(xxx).send(m)


// ------ next up ------

// Middle ware


const http = require('http'); // Import Node.js core http module

const URL = require('url') // Import url module for URL parsing

const routes = new Map() // Create a Map to store the routes

const { IncomingMessage, ServerResponse } = http;
class CustomIncomingMessage extends IncomingMessage {
    constructor() {
        super();
        this.params = {};

    }
}
class CustomServerResponse extends ServerResponse {

    json(data) {
        this.setHeader('Content-Type', 'application/json');
        this.write(JSON.stringify(data));
        this.end();
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    send(body = '', status = 200) {


        // check if the function status was used before this Default status code to status, 
        this.statusCode = this.statusCode ?? status

        // Set Content-Type based on data type

        if (typeof body === 'string') {
            this.setHeader('Content-Type', 'text/html');
        } else if (typeof body === 'object') {
            this.setHeader('Content-Type', 'application/json');
            body = JSON.stringify(body);
        }


        // Set Content-Length header
        this.setHeader('Content-Length', Buffer.byteLength(body));

        // Send headers and status code
        this.writeHead(status);

        // End on finish
        this.write(body)
        this.end();

    }

    error(status = 100, message = http.STATUS_CODES[status]) {
        this.statusCode = status; // set's the status code on the header 
        this.setHeader('Content-Type', 'application/json');
        // this.writeHead(status, http.STATUS_CODES[status]); 
        this.end(JSON.stringify({
            message
        }));
    }
}

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
function buildParamRouteTree(route) {
    // a new function routePrep which will be used within the assign function to save the routes in the trie.
    const parts = route.slice(1).split('/'); // to remove the first empty element from the parts array

    let currNode = routeTrie;
    for (let part of parts) {
        if (part.startsWith(':')) {
            // Parameter node 
            currNode.children[':param'] = new TrieNode('param', part.slice(1));
            currNode = currNode.children[':param'];
        } else {
            // Static path node
            currNode.children[part] = new TrieNode('path', part);
            currNode = currNode.children[part];
        }
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
const route = (route, method, callback) => {
    if (!http.METHODS.includes(method.toUpperCase())) throw new Error('Unknown method' + method)
    if (route.includes(":")) buildParamRouteTree(route)
    let obj = makeRoute(route) // Get route object

    obj[method.toUpperCase()] = callback // Assign callback 
}


// ------------
const paramRouteResolver = (pathName) => {

    // pathName = "/user/123/post/31a"
    // imagine a function called paramRouteResolver that takes pathName as input and the return (string) is assigned to a route variable. for example the function will take "/user/12" and return "/user/:id" .this function is called inside the caller function and the return will be the route checked to see if it's contained in the routes map. i'm thinking this function needs to return params as well, since well need to know what the id is.
    let route = '';
    let params = {};
    let pathParts = pathName.split('/').filter(p => p); // to remove the empty first element from the parts array

    let currNode = routeTrie;

    for (let part of pathParts) {

        if (currNode.children[part]) {
            currNode = currNode.children[part];
            route += `/${part}`;
        } else if (currNode.children[':param']) {
            let paramName = currNode.children[':param'].data;
            params[paramName] = part;
            route += `/:${paramName}`;
            currNode = currNode.children[":param"];
        } else {
            break;
        }
    }

    return { route, params };
}


// Route handler function  
const caller = (req, res) => {
    try {
        let reqUrl = URL.parse(req.url, true) // Parse request URL
        let method = req.method // Get request method
        let endpoint = reqUrl.pathname.replace(/\/$/, '') || '/' // Normalize pathname
        let parameters = {};
        if (!routes.has(endpoint)) {
            let { route, params } = paramRouteResolver(endpoint)
            // [endpoint, parameters] = [route, params] // why doesn't this work?
            endpoint = route
            parameters = params
            if (!routes.has(route)) throw 404
        }

        req.params = parameters
        // assigned callback function 
        let handler = routes.get(endpoint)[method.toUpperCase()] // Get route handler
        if (!handler) throw 405;
        handler(req, res) // Call handler

    } catch (err) {
        console.log(err)
        if (typeof err === 'number') {
            res.error(err);
        } else {
            console.log(err);
            res.error();
        }
    } finally {
        res.end()
    }
}


const createServer = (options, requestListener) => {
    const [userOptions, userRequestListener] = typeof arg1 === 'function' ? [{}, options] : [options, requestListener];

    // Default options
    let defaultOptions = {
        IncomingMessage: CustomIncomingMessage,
        ServerResponse: CustomServerResponse
    };

    // Spread user options to override  
    options = { ...defaultOptions, ...userOptions };

    const server = http.createServer(options);

    if (userRequestListener) {
        server.on('request', userRequestListener);
    }

    server.on('request', caller);

    return server;

}
// --------- Example route handlers ---------- 




module.exports = {
    IncomingMessage: CustomIncomingMessage,
    ServerResponse: CustomServerResponse,
    createServer,
    route,

}