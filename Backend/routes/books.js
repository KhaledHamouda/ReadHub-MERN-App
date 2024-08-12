const express = require('express')
const route  = express.Router()
const Book = require('../models/Book');

// handle display all books 
route.get('/', async(req, res) => {
    try {
        const allBooks = await Book.find({});
        res.json(allBooks);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Failed to retrieve books');
    }
});


// Handle adding books
route.post('/', (req, res) => {
    const book = new Book({
        photo: req.body.photo,
        title: req.body.title,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId,
    });

    book.save()
        .then(() => {
            console.log('Book Successfully Added!');
            res.redirect('/books');
        })
        .catch(e => {
            console.log(e.message);
            res.status(400).send('Failed to add book');
        });
});

module.exports = route;

