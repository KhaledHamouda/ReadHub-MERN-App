const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authMiddleware = require("../middlewares/userMiddleware");
const router = express.Router();
const { authSignup } = require("../controllers/validateData");

// Get all users (restricted to admin)
router.get("/", async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the user is admin or not
router.get("/admin", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found.");
    }
    res.json({ admin: user.admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user details by token
router.get("/getUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found.");
    }
    res.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

// Edit user details
router.post("/editUser", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findById(req.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (email && (await User.findOne({ email })) && email !== user.email) {
      return res.status(409).json({ error: "Email already used" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register a new user
router.post("/register/:admin?", async (req, res) => {
  try {
    const { error, value } = authSignup.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, email, password } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      admin: req.params.admin === "admin",
    });
    await newUser.save();
    // const token = newUser.generateAuthToken();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);

    const user = await User.findByCredentials(email, password);
    console.log("Found user:", user);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    console.log("Generated token:", token);

    res.status(200).json({ token, admin: user.admin });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

router.post("/logout", authMiddleware, (req, res) => {
  res.json({ msg: "User logged out!" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const result = await User.findByIdAndRemove(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
