const express = require('express');
require('dotenv').config()
connectDb = require('./config/dbConnection')
const userRoutes = require('./routes/userRouter');

// Mongoose connection
connectDb()

const app = express();

app.get('/', (req, res)=>{
    console.log('Index Page is Here!')
})

// Api routes and middlewares.
app.use(express.json());

app.use('/users', userRoutes);


const port = process.env.PORT || 3100;
const host = process.env.HOST || 'localhost';

app.listen(port, host, (err)=>{
    console.log(`Server Running on http://${host}:${port}`) 
})