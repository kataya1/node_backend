res.json():

    Sets the Content-Type header to application/json
    Converts the JavaScript object and non objects to a JSON string
    Sends the JSON response
    usefull when you wanna format using 
    ```
        app.set('json replacer', replacer); // property transformation rules
        app.set('json spaces', 2); // number of spaces for indentation
    ```


res.send():

    Can send a variety of response types (JSON, string, Buffer, etc.) depending on the input
    automatically set a Content-Type header
    Simply passes through the input to the response
    no need to call json.stringfy


res.send():

    Sends the HTTP response
    Automatically sets the Content-Length header
    Supports string, JSON, Buffer and stream input
    Ends the response


res.write():

    Sends a part of the response body
    Does not end the response
    Usually used along with res.end() to complete the response
    Can be called multiple times to send chunks of data
    Headers should be sent with res.writeHead() before calling res.write()

```
// Using res.send()
res.send('Hello'); 

// Using res.write()
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.write('Hello');
res.end();  
```


-----
**does res.send and res.json exist on the res object of http server module or are they added in express?**
In Node.js HTTP server, the res object is of type http.ServerResponse, and it only has very basic methods like:
```JS
res.write() to write a response
res.end() to end the response
res.setHeader() to set headers
// etc.
```
Express adds many additional methods to the response (accessible as res in Express) to make it easier to work with, including:
```JS
res.send()
res.json()
res.render()
res.redirect()
res.sendFile()
// And many more!
```