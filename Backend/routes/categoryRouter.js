const express = require("express");
// const mongoose = require("mongoose");
const Category = require("../models/category");
const route = express.Router();

// Category post
route.post("/", async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: "categoryName is required" });
  }

  try {
    const newCategory = new Category({
      categoryName: categoryName,
    });

    await newCategory.save();

    res.status(201).json(newCategory);
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

// Get the data of all category DB
route.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Get category by id
route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne({ categoryId: id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Delete category by id
route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCategory = await Category.findOneAndDelete({ categoryId: id });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Delete all categories
route.delete("/", async (req, res) => {
  try {
    const result = await Category.deleteMany({});
    res.json({
      message: `${result.deletedCount} categories deleted successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = route;
