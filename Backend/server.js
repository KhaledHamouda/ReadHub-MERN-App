require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const Book = require('./models/Book');
const booksRoute = require('./routes/books');

connectDb = require('./config/dbConnection')
const userRoutes = require('./routes/userRouter');

// Mongoose connection
connectDb()

//declare application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the books route
app.use('/books', booksRoute); 

app.get('/',(req, res)=>{
  res.send('Hello To goodreads APP !!');
})

const port = process.env.PORT || 3100;
const host = process.env.HOST || 'localhost';

app.listen(port, host, ()=>{
    console.log(`Server Running on http://${host}:${port}`) 
})