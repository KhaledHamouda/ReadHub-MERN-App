const express = require("express");
const multer = require("multer");
const Author = require("../models/author");
const route = express.Router();

// Set up multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/", upload.single("authorPhoto"), async (req, res) => {
  const { authorFirstName, authorLastName, authorDateOfBirth } = req.body;
  const authorPhoto = req.file;

  if (!authorFirstName) {
    return res.status(400).json({ message: "authorFirstName is required" });
  }

  try {
    const newAuthor = new Author({
      authorFirstName: authorFirstName,
      authorLastName: authorLastName,
      authorDateOfBirth: authorDateOfBirth, // Optional
      authorPhoto: authorPhoto
        ? {
            data: authorPhoto.buffer, // Get file data from memory
            contentType: authorPhoto.mimetype,
          }
        : undefined,
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

// get author photo by ID
route.get("/photo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findOne({ _id: id });
    if (!author || !author.authorPhoto || !author.authorPhoto.data) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.set("Content-Type", author.authorPhoto.contentType);
    res.send(author.authorPhoto.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Route to update author details and/or photo
route.put("/:id", upload.single("authorPhoto"), async (req, res) => {
  const id = req.params.id;
  const { authorFirstName, authorLastName, authorDateOfBirth } = req.body;
  const authorPhoto = req.file; // Get file from multer

  try {
    // Find the author by ID
    const author = await Author.findOne({ _id: id });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Update author details
    if (authorFirstName) author.authorFirstName = authorFirstName;
    if (authorLastName) author.authorLastName = authorLastName;
    if (authorDateOfBirth) author.authorDateOfBirth = authorDateOfBirth;

    // Update author photo
    if (authorPhoto) {
      author.authorPhoto = {
        data: authorPhoto.buffer,
        contentType: authorPhoto.mimetype,
      };
    }

    await author.save(); // Save the updated author
    res.json(author);
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

// Route to update author details and/or photo by ID
route.put("/:id", upload.single("authorPhoto"), async (req, res) => {
  const id = req.params.id;
  const { authorFirstName, authorLastName, authorDateOfBirth } = req.body;
  const authorPhoto = req.file;

  try {
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    if (authorFirstName) author.authorFirstName = authorFirstName;
    if (authorLastName) author.authorLastName = authorLastName;
    if (authorDateOfBirth) author.authorDateOfBirth = authorDateOfBirth;

    if (authorPhoto) {
      author.authorPhoto = {
        data: authorPhoto.buffer,
        contentType: authorPhoto.mimetype,
      };
    }

    await author.save();
    res.json(author);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = route;
