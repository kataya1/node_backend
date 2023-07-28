// Inside express source code

app.use = function (middleware) {

    // Maintain reference to middleware function
    this.middlewareStack.push(middleware);

    return this; // For chaining
}

app.handleRequest = function (req, res) {

    // Get middleware from stack
    let middlewares = this.middlewareStack;

    // Create iterator 
    let i = 0;

    // Internal dispatch function
    function dispatch(i) {
        // If end of middleware stack, handle request
        if (i === middlewares.length) {
            return this.handleRequest(req, res);
        }

        // Get current middleware
        let middleware = middlewares[i];

        // Run middleware, increment index
        middleware(req, res, () => dispatch(i + 1));
    }

    // Start pipeline
    dispatch(0);

}