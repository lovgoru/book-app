const Book = require('../models/book');

const book_list = (req, res) =>{

    Book.find().sort({createdAt: -1})
        .then(result =>{
            res.render('books', {lista: result});
        })
        .catch(err =>{
            console.log(err);
        });

}

const book_create_get = (req, res) =>{
    res.render('create');
}

const book_create_post = (req, res) =>{
    const newBook = { title: req.body.title, author: req.body.author, rating: req.body.rating, sumRatings: req.body.rating, numRatings: 1}
    const book = new Book(newBook);
    book.save()
        .then(result =>{
            res.redirect('/books');
        })
        .catch(err =>{
            console.log(err);
        });
}

const book_delete = (req, res) =>{
    Book.findByIdAndDelete(req.params.id)
        .then(result =>{
            res.redirect('/books');
        })
        .catch(err =>{
            console.log(err);
        });
}

const book_rate_get = (req, res) =>{
    Book.findById(req.params.id)
        .then(result =>{
            res.render('rate', {book: result});
        })
        .catch(err =>{
            console.log(err);
        })
}

const book_rate_post = (req, res) =>{
    Book.findById(req.params.id)
        .then(result =>{
            const filter = {_id: req.params.id};
            const updateDoc = {
                $set: {
                sumRatings: result.sumRatings + parseFloat(req.body.rating),
                numRatings: result.numRatings + 1,
                rating: ((result.sumRatings + parseFloat(req.body.rating))/(result.numRatings + 1)).toFixed(2)
                },
            };
            Book.updateOne(filter, updateDoc)
                .then(result1 =>{
                    res.redirect('/books/rate/' + req.params.id);
                })
                .catch(err =>{
                    console.log(err);
                })
        })
    
}

module.exports = {
    book_list,
    book_create_get,
    book_create_post,
    book_delete,
    book_rate_get,
    book_rate_post
}