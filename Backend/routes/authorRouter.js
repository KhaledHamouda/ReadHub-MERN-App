const express = require("express");
const Author = require("../models/author");
const Book = require("../models/Book");
const UserBook = require("../models/UserBook");
const route = express.Router();

// Create a new author
route.post("/", async (req, res) => {
  const { authorFirstName, authorLastName, authorDateOfBirth, authorPhoto } =
    req.body;

  if (!authorFirstName) {
    return res.status(400).json({ message: "authorFirstName is required" });
  }

  try {
    const newAuthor = new Author({
      authorFirstName,
      authorLastName,
      authorDateOfBirth,
      authorPhoto,
    });

    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Get the photo URL by author ID
route.get("/photo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOne({ _id: id });
    if (!author || !author.authorPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json({ photoUrl: author.authorPhoto });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Update author details and/or photo URL
route.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { authorFirstName, authorLastName, authorDateOfBirth, authorPhoto } =
    req.body;

  try {
    const author = await Author.findOne({ _id: id });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    if (authorFirstName) author.authorFirstName = authorFirstName;
    if (authorLastName) author.authorLastName = authorLastName;
    if (authorDateOfBirth) author.authorDateOfBirth = authorDateOfBirth;
    if (authorPhoto) author.authorPhoto = authorPhoto;

    await author.save();
    res.json(author);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Get all authors
route.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Get author by ID
route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Delete author by ID
route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAuthor = await Author.findOneAndDelete({ authorId: id });
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json({ message: "Author deleted successfully", deletedAuthor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Delete all authors
route.delete("/", async (req, res) => {
  try {
    const result = await Author.deleteMany({});
    res.json({
      message: `${result.deletedCount} authors deleted successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Get books by author ID
route.get("/:id/books", async (req, res) => {
  const authorId = req.params.id;
  try {
    // Find books by the author
    const books = await Book.find({ authorId });

    // If no books are found, return an empty array
    if (!books.length) {
      return res.json([]);
    }

    // Iterate over each book and calculate average rating and rating count
    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const userBooks = await UserBook.find({ bookId: book._id });

        const ratingCount = userBooks.length;
        const totalRating = userBooks.reduce(
          (sum, userBook) => sum + (userBook.rating || 0),
          0
        );
        const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

        return {
          ...book.toObject(),
          averageRating: averageRating.toFixed(2),
          ratingCount,
        };
      })
    );

    res.json(booksWithRatings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

route.get("/:id/details", async (req, res) => {
  const authorId = req.params.id;

  try {
    // Find the author
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const books = await Book.find({ authorId });
    if (books.length === 0) {
      return res.json({
        author,
        averageRating: 0,
        ratingCount: 0,
        bookStates: [],
        message: "This author has no books with ratings",
      });
    }

    const bookIds = books.map((book) => book._id);
    const userBooks = await UserBook.find({ bookId: { $in: bookIds } });

    const ratingCount = userBooks.length;
    const totalRating = userBooks.reduce(
      (sum, userBook) => sum + (userBook.rating || 0),
      0
    );
    const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

    const bookStates = userBooks.map((userBook) => ({
      bookId: userBook.bookId,
      state: userBook.state,
      rating: userBook.rating,
    }));

    res.json({
      author,
      averageRating: averageRating.toFixed(2),
      ratingCount,
      bookStates,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});
module.exports = route;
