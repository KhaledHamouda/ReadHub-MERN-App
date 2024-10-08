const express = require("express");
const router = express.Router();
const UserBook = require("../models/UserBook");
const User = require("../models/user");

const findOrCreateUserBook = async (userId, bookId) => {
  let userBook = await UserBook.findOne({ userId, bookId });
  if (!userBook) {
    userBook = new UserBook({ userId, bookId });
  }
  return userBook;
};

router.get("/:userId/books", async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.query;

    let userBooks;

    if (bookId) {
      // Fetch a specific book
      userBooks = await UserBook.findOne({ userId, bookId }).populate("bookId");
      if (!userBooks) {
        return res.status(404).json({ message: "UserBook not found" });
      }
    } else {
      // Fetch all books
      userBooks = await UserBook.find({ userId }).populate("bookId");
    }

    res.status(200).json(userBooks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to retrieve user books");
  }
});

// Handle updating or adding a user's book state
router.post("/state", async (req, res) => {
  try {
    const { userId, bookId, state } = req.body;
    console.log(userId, bookId, state)
    const validStates = ["Read", "Currently Reading", "Want to Read"];
    if (!validStates.includes(state)) {
      return res.status(400).json({ message: "Invalid state" });
    }

    const userBook = await findOrCreateUserBook(userId, bookId);
    userBook.state = state;

    await userBook.save();
    res.status(201).json({ message: "Book state updated", userBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to update book state");
  }
});

// Handle updating or adding a user's book review
router.post("/review", async (req, res) => {
  try {
    const { userId, bookId, review } = req.body;


    const userBook = await findOrCreateUserBook(userId, bookId);
    userBook.review = review;

    await userBook.save();
    res.status(201).json({ message: "Book review updated", userBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to update book review");
  }
});

// Handle updating or adding a user's book rating
router.post("/rating", async (req, res) => {
  try {
    const { userId, bookId, rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const userBook = await findOrCreateUserBook(userId, bookId);
    userBook.rating = rating;

    await userBook.save();
    res.status(201).json({ message: "Book rating updated", userBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to update book rating");
  }
});

// Handle deleting a user's book review
router.delete("/review", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const userBook = await UserBook.findOne({ userId, bookId });
    if (!userBook || !userBook.review) {
      return res.status(404).json({ message: "Review not found" });
    }

    userBook.review = undefined;
    await userBook.save();

    res.status(200).json({ message: "Review deleted", userBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to delete review");
  }
});

// Handle deleting a user's book rating
router.delete("/rating", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const userBook = await UserBook.findOne({ userId, bookId });
    if (!userBook || userBook.rating === undefined) {
      return res.status(404).json({ message: "Rating not found" });
    }

    userBook.rating = undefined;
    await userBook.save();

    res.status(200).json({ message: "Rating deleted", userBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to delete rating");
  }
});

router.get("/reviews/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await UserBook.find({
      bookId,
      review: { $exists: true },
    }).populate("userId", "firstName lastName");

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to retrieve reviews");
  }
});

module.exports = router;
