const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.statics.authenticate = function (email, password, callback) {  
    User.findOne({ email: email }).exec(function (err, user) {  
        if (err) return callback(err);
        if (!user) {
            let err = new Error("User not found");
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) return callback(null, user);
            callback();
        })
    })
}

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {  
        if (err) return next(err);
        user.password = hash;
        next();
    })
})

const User = mongoose.model("users", UserSchema);

module.exports = User;


