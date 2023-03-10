const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

const register_get = (req, res) =>{
    res.render('register', {logged: req.isAuthenticated()});
}

const register_post = async (req, res) =>{
    try {
        const user = await User.findOne({username: req.body.username});
        if(user){
            console.log('Vec postoji korisnik s tim korisnickim imenom');
            req.flash('error', 'Korisnik s unesenim korisničkim imenom već postoji!');
            res.redirect('/register');
            return;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Greška! Pokušajte ponovno.');
        res.redirect('/register');
    }

}

const login_get = (req, res) =>{
    res.render('login', {logged: req.isAuthenticated()});
}

const login_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
});

const logout = (req, res) =>{
    req.logout(err =>{
        if(err){
            console.log(err);
        }
        res.redirect('/login');
    });
}


module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout
}