const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema({
    idShow: { 
        type: Number, 
        unique: true, 
        required: false 
    },
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
        ref: "Category",
        required: true,
    },
    authorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Author",
        required: true,
    },
    categoryShow: {
        type: String,
        required: true,
    },
    authorShow: {
        type: String,
        required: true
    }
});
bookSchema.plugin(AutoIncrement, { inc_field: "idShow" });

module.exports = mongoose.model('Book', bookSchema)



