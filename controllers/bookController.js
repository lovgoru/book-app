const Book = require("../models/book");

const book_list = async (req, res) => {
  try {
    let result = await Book.find().sort({ rating: -1 });
    res.render("books", { books: result, logged: req.isAuthenticated() });
  } catch (err) {
    console.log(err);
  }
};

const book_details = async (req, res) => {
  try {
    const result = await Book.findById(req.params.id);

    return result;
  } catch (err) {
    console.log(err);
  }
};

const book_create_get = (req, res) => {
  res.render("create", { logged: req.isAuthenticated() });
};

const book_create_post = async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      sumRatings: req.body.rating,
      numRatings: 1,
      numOnes: req.body.rating === "1" ? 1 : 0,
      numTwos: req.body.rating === "2" ? 1 : 0,
      numThrees: req.body.rating === "3" ? 1 : 0,
      numFours: req.body.rating === "4" ? 1 : 0,
      numFives: req.body.rating === "5" ? 1 : 0,
    };
    const book = new Book(newBook);
    await book.save();
    res.redirect("/books");
  } catch (err) {
    console.log(err);
  }
};

const book_delete = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
  }
};

const book_rate_post = async (req, res) => {
  try {
    const result = await Book.findById(req.params.id);
    const filter = { _id: req.params.id };
    const updateDoc = {
      $set: {
        sumRatings: result.sumRatings + parseFloat(req.body.starButton),
        numRatings: result.numRatings + 1,
        rating: (
          (result.sumRatings + parseFloat(req.body.starButton)) /
          (result.numRatings + 1)
        ).toFixed(2),
        numOnes: result.numOnes + (req.body.starButton === "1" ? 1 : 0),
        numTwos: result.numTwos + (req.body.starButton === "2" ? 1 : 0),
        numThrees: result.numThrees + (req.body.starButton === "3" ? 1 : 0),
        numFours: result.numFours + (req.body.starButton === "4" ? 1 : 0),
        numFives: result.numFives + (req.body.starButton === "5" ? 1 : 0),
      },
    };
    await Book.updateOne(filter, updateDoc);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  book_list,
  book_details,
  book_create_get,
  book_create_post,
  book_delete,
  book_rate_post,
};
