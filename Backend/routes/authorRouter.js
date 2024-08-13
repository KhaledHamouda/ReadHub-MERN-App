const express = require("express");
// const mongoose = require("mongoose");
const Author = require("../models/author");
const route = express.Router();

// Author post
route.post("/", async (req, res) => {
  const { authorFirstName, authorLastName, authorDateOfBirth } = req.body;

  if (!authorFirstName) {
    return res.status(400).json({ message: "authorFirstName is required" });
  }

  try {
    const newAuthor = new Author({
      authorFirstName: authorFirstName,
      authorLastName: authorLastName,
      authorDateOfBirth: authorDateOfBirth, // Optional
    });

    await newAuthor.save();

    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({ message: "Unique constraint error", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  }
});

// Get the data of all author DB
route.get("/", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// Get author by id
route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOne({ authorId: id });
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

// Delete author by id
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

module.exports = route;
