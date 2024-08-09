const express = require('express');
const dotenv = require('dotenv').config()
connectDb = require('./config/dbConnection')

// Mongoose connection
connectDb()

const app = express();

// Api routes and middlewares.

app.use(express.json());

//running the server
const port = process.env.PORT || 3030
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})