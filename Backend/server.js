require("dotenv").config();
const express = require("express");
const booksRoute = require("./routes/bookRouter");
const userRoutes = require("./routes/userRouter");
const authorRoutes = require("./routes/authorRouter");
const categoryRoutes = require("./routes/categoryRouter");

connectDb = require("./config/dbConnection");

// Mongoose connection
connectDb();

//declare application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the books route
app.use("/books", booksRoute);

// Use user route
app.use("/users", userRoutes);

// Use author and category
app.use("/", authorRoutes);
app.use("/", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Hello To goodreads APP !!");
});

const port = process.env.PORT || 3100;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Server Running on http://${host}:${port}`);
});
