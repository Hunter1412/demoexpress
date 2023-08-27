const UserModel = require('../models/user.model');

module.exports.login = (req, res, next) => {
    if (req.body.loginEmail && req.body.loginPassword) {
        UserModel.authenticate(req.body.loginEmail, req.loginPassword, (err, user) => {
            if (err || !user) {
                const err = new Error("Wrong email or password.");
                err.status = 401;
                return next(err);
            }
            // login successful
            req.session.userId = user._id;
            return res.redirect('/profile');
        })
    } else {
        const err = new Error("All fields required.");
        err.status = 400;
        return next(err);
    }
}

module.exports.logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) return next(err);
            return res.redirect('/')
        })
    }
}