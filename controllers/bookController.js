const Book = require('../models/book');

const book_list = async (req, res) =>{

    try {
        const result = await Book.find().sort({rating: -1});
        res.render('books', {lista: result, logged: req.isAuthenticated()});
    } catch (err) {
        console.log(err);
    }
}

const book_create_get = (req, res) =>{
    res.render('create', {logged: req.isAuthenticated()});
}

const book_create_post = async (req, res) =>{
    try {
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            sumRatings: req.body.rating,
            numRatings: 1}
        const book = new Book(newBook);
        await book.save();
        res.redirect('/books');
    } catch (err) {
        console.log(err);
    }
}

const book_delete = async (req, res) =>{
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch (err) {
        console.log(err);
    }
}

const book_rate_get = async (req, res) =>{
    try {
        const result = await Book.findById(req.params.id);
        res.render('rate', {book: result, logged: req.isAuthenticated()});
    } catch (err) {
        console.log(err);
    }
}

const book_rate_post = async (req, res) =>{
    try {
        const result = await Book.findById(req.params.id);
        const filter = {_id: req.params.id};
        const updateDoc = {
            $set: {
            sumRatings: result.sumRatings + parseFloat(req.body.rating),
            numRatings: result.numRatings + 1,
            rating: ((result.sumRatings + parseFloat(req.body.rating))/(result.numRatings + 1)).toFixed(2)
            },
        };
        await Book.updateOne(filter, updateDoc);
        res.redirect('/books/rate/' + req.params.id);
    } catch (err) {
        console.log(err);
    }
    
}


module.exports = {
    book_list,
    book_create_get,
    book_create_post,
    book_delete,
    book_rate_get,
    book_rate_post
}