const express = require("express")
const bird = require("./bird")
const app = express()

// middleware function 
const myLogger = (req, res, next) => {
    console.log(`time: ${Date.UTC}`)
    next()
}
const tomato = (req, res, next) => {
    console.log('🍅🍅🍅🍅')
    next()
}
// This is middleware 
app.use([myLogger, tomato])

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.get('/', (req, res, next) => {
    // middleware
    console.log("it passes through here first")
    next()
}, (req, res) => {
    console.log('requested')
    res.send('it\'s the final brain cell terururu')
})

// mutli oberation for the same rout
app.route('/book')
    .get((req, res) => {
        res.send('Get a random book')
    })
    .post((req, res) => {
        res.send('Add a book')
    })
    .put((req, res) => {
        res.send('Update the book')
    })

// url variables
app.get('book/:bookId', (req, res) => {
    res.send(`you want book with book id ${bookId}`)
})

//  this is using modules
app.use('/birds', bird)


app.listen(port = 3000, () => {
    console.log(`app is listening my friend at http://localhost:${port}`)
})

