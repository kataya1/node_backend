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
app.route('/books')
    .get((req, res) => {
        res.json([
            {
              title: 'The Great Gatsby',
              author: 'F. Scott Fitzgerald', 
              year: 1925,
              genres: ['novel', 'fiction', 'classic']
            },
            {
              title: 'Slaughterhouse Five',
              author: 'Kurt Vonnegut',
              year: 1969,
              genres: ['novel', 'fiction', 'science fiction']
            },
            {
              title: 'The Catcher in the Rye',
              author: 'J.D. Salinger',
              year: 1951,
              genres: ['novel', 'fiction', 'classic literature']
            }
          ]);
    })
    .post((req, res) => {
        res.send('Add a book')
    })
    .put((req, res) => {
        res.send('Update the book')
    })

// url variables
app.get('/books/:bookId', (req, res) => {
    res.send(`you want book with book id ${bookId}`)

})

//  this is using modules
app.use('/birds', bird)


app.listen(port = 3000, () => {
    console.log(`app is listening my friend at http://localhost:${port}`)
})

