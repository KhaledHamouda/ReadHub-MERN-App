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
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    authorId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
})

module.exports = mongoose.model('Book', bookSchema)



