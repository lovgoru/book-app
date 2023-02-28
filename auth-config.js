const User = require('./models/user');
const bcrypt = require('bcrypt');

const authUser = (user, password, done) => {

    User.findOne({username: user})
        .then(result1 =>{
            if(result1){
                bcrypt.compare(password, result1.password)
                    .then(result2 =>{
                        if(result2){
                            return done(null, result1);
                        }
                        else{
                            return done(null, false, {message: 'Unijeli ste pogrešnu lozinku!'});
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                    });
            }
            else{
                return done(null, false, {message: 'Ne postoji korisnik s unesenim korisničkim imenom!'});
            }
        })
        .catch(err =>{
            console.log(err);
        });
}

module.exports = authUser;
