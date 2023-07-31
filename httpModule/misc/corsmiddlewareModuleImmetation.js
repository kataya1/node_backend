// the cors module exports a pre-configured CORS middleware function that handles calling next() internally.
// the implementation looks something like:
module.exports = function cors(options) {

    return function (req, res, next) {
        // Set CORS headers on res object
        res.setHeader('Access-Control-Allow-Origin', '*');
        // ...other headers

        // Call next() to pass control
        next();
    }

}