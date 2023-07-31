const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); // enable CORS
// cors
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // CORS headers
//     next();
// });

app.get('/books', (req, res) => {
    res.json({ books: ['Book 1', 'Book 2'] });
});

app.listen(3000, () => {
    console.log('app is listening on port 3000')
});