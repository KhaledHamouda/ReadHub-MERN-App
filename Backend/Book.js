const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Book', bookSchema)



