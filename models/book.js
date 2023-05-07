const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  sumRatings: {
    type: Number,
    required: true,
  },
  numRatings: {
    type: Number,
    required: true,
  },
  numOnes: {
    type: Number,
    required: true,
  },
  numTwos: {
    type: Number,
    required: true,
  },
  numThrees: {
    type: Number,
    required: true,
  },
  numFours: {
    type: Number,
    required: true,
  },
  numFives: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
