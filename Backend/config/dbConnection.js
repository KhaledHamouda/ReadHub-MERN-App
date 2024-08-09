require('dotenv').config();
const mongoose = require('mongoose')

const uri = process.env.CONNECTION_STRING

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(uri);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
    }catch(error){
        console.log(`Error failed to connect to mongoDB atlas: ${error}`);
    }
}

module.exports = connectDB

