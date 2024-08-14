const mongoose = require("mongoose");

const userBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    state: {
      type: String,
      enum: ["Read", "Currently Reading", "Want to Read"],
      default: "Want to Read",
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const UserBook = mongoose.model("UserBook", userBookSchema);

module.exports = UserBook;
