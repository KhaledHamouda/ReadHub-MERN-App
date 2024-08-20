const express = require('express')
const route  = express.Router()
const Book = require('../models/Book');
const Category = require("../models/category");
const Author = require("../models/author");

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
    const catName = req.query.categoryName
    const authName = req.query.authorName.split(" ");
    const authFirstName = authName[0];
    const authSecondName = authName[1];
    // fetch ids from DB
    Category.where('categoryName').equals(catName).select('_id categoryId')
    .then(cat => {
        // Ensure that `catId` is resolved before proceeding
        return Author.where('authorFirstName').equals(authFirstName)
            .where('authorLastName').equals(authSecondName)
            .select('_id authorId')
            .then(auth=> {
                // Create and log the new book instance
                const book = new Book({
                    photo: req.query.photo,
                    title: req.query.title,
                    categoryId: cat[0]._id,
                    categoryShow: cat[0].categoryId,
                    authorShow: auth[0].authorId,
                    authorId: auth[0]._id
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
    })
    .catch(err => {
        console.error('Error:', err);
    });
    
});

//Handle updating book
route.put('/:id', async (req, res) => {
    try {
        const book_id = req.params.id;
        const updateData = req.body
        console.log(req.body.categoryId);
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
        res.status(200).json({ message: 'Book deleted successfully' });

    } catch (e) {
        console.log(e.message);
        res.status(500).send('Failed to delete the book');
    }
});

module.exports = route;

