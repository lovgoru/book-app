if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const morgan = require('morgan');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authConfig = require('./auth-config');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');
const flash = require('express-flash');

const app = express();

// Povezivanje s bazom podataka

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


// Middleware

app.set('view engine', 'ejs');

app.use(flash());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (authConfig));

passport.serializeUser((user, done) =>{
    done(null, user);
  });
  
  passport.deserializeUser((user, done) =>{
    done(null, user);
  });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// Routes

app.use('/', userRoutes);

app.get('/', (req, res) =>{
    res.render('index', {logged: req.isAuthenticated()});
});

app.use('/books', checkAuthenticated, bookRoutes);

app.use((req, res) =>{
    res.status(404).render('404');
});

// Pomocne funkcije za provjeru je li korisnik autenticiran

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login');
  }