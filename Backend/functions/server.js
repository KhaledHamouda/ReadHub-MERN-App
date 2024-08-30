require("dotenv").config();
const express = require("express");
const booksRoute = require("../routes/bookRouter");
const userRoutes = require("../routes/userRouter");
const authorRoutes = require("../routes/authorRouter");
const categoryRoutes = require("../routes/categoryRouter");
const userBookRoutes = require("../routes/userBookRouter");
const cors = require("cors");
const serverless = require("serverless-http");
const router = express.Router()

connectDb = require("../config/dbConnection");

// Mongoose connection
connectDb();

//declare application
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Use the books route
app.use("/.netlify/functions/server/books", booksRoute);

// Use user route
app.use("/.netlify/functions/server/users", userRoutes);

// Use author and category
app.use("/.netlify/functions/server/authors", authorRoutes);
app.use("/.netlify/functions/server/categories", categoryRoutes);

// Use the userBook routes
app.use("/.netlify/functions/server/userbook", userBookRoutes);

app.get("/.netlify/functions/server", (req, res) => {
  res.send("Hello To goodreads APP !!");
});

const port = process.env.PORT || 3100;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Server Running on http://${host}:${port}`);
});

module.exports.handler = serverless(app);