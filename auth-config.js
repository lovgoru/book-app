const User = require('./models/user');
const bcrypt = require('bcrypt');

const authUser = async (user, password, done) => {
    try {
        const result = await User.findOne({username: user});
        if(result){
            const areEqual = await bcrypt.compare(password, result.password);
            if(areEqual){
                return done(null, result);
            }
            else{
                return done(null, false, {message: 'Unijeli ste pogrešnu lozinku!'});
            }
        }
        else{
            return done(null, false, {message: 'Ne postoji korisnik s unesenim korisničkim imenom!'});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = authUser;
