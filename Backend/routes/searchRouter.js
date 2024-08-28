// server/routes/search.js
const express = require('express');
const router = express.Router();

const Book = require("../models/Book");
const Category = require('../models/category');
const Author = require("../models/author");


router.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    // Search in books
    const books = await Book.find({ title: { $regex: query, $options: 'i' } });

    // Search in categories
    const categories = await Category.find({ name: { $regex: query, $options: 'i' } });

    // Search in authors
    const authors = await Author.find({ name: { $regex: query, $options: 'i' } });

    res.json({
      books,
      categories,
      authors,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search' });
  }
});

module.exports = router;
