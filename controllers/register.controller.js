const UserModel = require('../models/user.model');

const register = (req, res, next) => {
    if (req.body.password !== req.body.passwordCfi) {
        let err = new Error('Password do not match');
        err.status = 400;
        res.send("passwords don't match");
        return next(err);
    }
    if (
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordCfi
    ) {
        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        UserModel.create(userData, (err, user) => {
            if (err) return next(err);
            req.session.userId = user._id;
            return res.redirect('/profile');
        })
    } else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
}

module.exports = register;