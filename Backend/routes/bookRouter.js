const express = require('express')
const route  = express.Router()
const Book = require('../models/Book');

// Handle display all books 
route.get('/', async(req, res) => {
    try {
        const allBooks = await Book.find({});
        res.json(allBooks);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Failed to retrieve books');
    }
});

// Handle get book by id
route.get('/:id', async(req, res) => {
    try {
        const book_id = req.params.id
        const targetBook = await Book.findById(book_id);
        res.json(targetBook);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Failed to retrieve book');
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

//Handle updating book
route.put('/:id', async (req, res) => {
    try {
        const book_id = req.params.id;
        const updateData = req.body
        const targetBook = await Book.findByIdAndUpdate(book_id, updateData, {
            new: true,
            runValidators: true
        });

        if (!targetBook) {
            return res.status(404).send('Book Not Found');
        }

        console.log(`Book of ID: ${targetBook._id} has been Updated!`);
        res.json(targetBook);

    } catch (e) {
        console.log(e.message);
        res.status(500).send('Failed to Update the book!');
    }
});

// Handle deleting books
route.delete('/:id', async (req, res) => {
    try {
        const book_id = req.params.id;
        const targetBook = await Book.findByIdAndDelete(book_id);

        if (!targetBook) {
            return res.status(404).send('Book Not Found');
        }
        console.log(`Book of ID: ${targetBook._id} has been deleted!`);
        res.redirect('/books');

    } catch (e) {
        console.log(e.message);
        res.status(500).send('Failed to delete the book');
    }
});

module.exports = route;

