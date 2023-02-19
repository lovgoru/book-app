const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const morgan = require('morgan');

const app = express();

mongoose.set('strictQuery', true);
const dbURI = "mongodb+srv://lovgoru:BgHrwA85RVca3p5S@cluster0.2q5fats.mongodb.net/book-app?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) =>{
    res.render('index');
});

app.use('/books', bookRoutes);

app.use((req, res) =>{
    res.status(404).render('404');
});