const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  authorId: { 
    type: Number, 
    unique: true, 
    required: false 
  },

  authorPhoto: { 
    type: String, 
    contentType: String 
  },

  authorFirstName: { 
    type: String, 
    unique: true, 
    required: true 
  },
  
  authorLastName: String,
  authorDateOfBirth: Date,
});

// Apply auto-increment to the authorId field
authorSchema.plugin(AutoIncrement, { inc_field: "authorId" });
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
