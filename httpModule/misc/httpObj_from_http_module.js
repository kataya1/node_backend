const http = require('node:http');


console.log(http.METHODS)
console.log(http.STATUS_CODES)
console.log(http.globalAgent)
console.log(http.maxHeaderSize)

// http.get(options[, callback])
// http.get(url[, options][, callback])
// http.request(options[, callback])
// http.request(url[, options][, callback])


// -- useless --
// http.validateHeaderName(name[, label])
// http.validateHeaderValue(name, value)
// http.setMaxIdleHTTPParsers(max)