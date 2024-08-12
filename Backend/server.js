const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config()
connectDb = require('./config/dbConnection')

// Mongoose connection
connectDb()

// book is collection in my database.
const Book = require('./Book');

const app = express();

// Api routes and middlewares.
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended:false}))

//page to insert books
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'addBooks.html'));
});

// get all books in readHub
app.get('/books', async (req, res) => {
    try {
        const allBooks = await Book.find({});
        res.send(allBooks);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Internal Server Error');
    }
});

// handle post books
app.post('/books', (req, res)=>{
    const book = new Book({
        photo: req.body.photo,
        title: req.body.title,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId,
    })
    book.save().then(()=>{
        console.log('Book Successfully Added!')
        res.redirect('/books');
    })
    .catch(e => console.log(e.message))
})

const port = process.env.PORT || 3100;
const host = process.env.HOST || 'localhost';

app.listen(port, host, (err)=>{
    console.log(`Server Running on http://${host}:${port}`) 
})