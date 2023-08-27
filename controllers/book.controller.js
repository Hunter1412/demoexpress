const BookModel = require('../models/book.model');
const deleteFile = require('../Utils/fileImage');

const data = {
    books: BookModel.find({}).exec()
}


module.exports.index = async (req, res, next) => {
    return await BookModel.find({}).exec().then((result) => {
        res.render('book/index', { books: result })
    }).catch((err) => {
        next(err)
    });
}

module.exports.search2 = (req, res, next) => {
    let title = req.query.title ?? '';
    if (!title) return res.redirect('/book');

    let books = data.books;

    const result = books.filter(item => item.title.substring(title));
    console.log(result);
    if (!result) {
        res.redirect('/book');
    }
    res.render('book/index', { books: result });
}



module.exports.search = async (req, res, next) => {
    let title = req.query.title ?? '';
    if (!title) return res.redirect('/book');

    const query = { title: title };

    return await BookModel.find(query).exec()
        .then((result) => res.render('book/index', { books: result }))
        .catch((err) => {
            console.error(err);
        });
}

module.exports.create = async (req, res, next) => {
    return await res.render('book/create');
}

module.exports.store = async (req, res, next) => {
    const filename = req.file ? req.file.filename : '';
    await BookModel.create({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        image: filename
    }).then((result) => {
        res.redirect('/book')
    }).catch((err) => {
        console.log(err);
        next(err)
    });
}
module.exports.show = async (req, res, next) => {
    const id = req.params.id;
    return await BookModel.findById(id).exec()
        .then((result) => res.render('book/detail', { book: result }))
        .catch((err) => next(err))
}
module.exports.edit = async (req, res, next) => {
    const id = req.params.id;
    return await BookModel.findById(id).exec()
        .then((result) => res.render('book/update', { book: result }))
        .catch((err) => next(err))
}
module.exports.update = async (req, res, next) => {
    const id = req.params.id;
    let book = null;
    await BookModel.findById(id)
        .exec().then((result) => book = result)
        .catch(err => console.error(err));

    let filename = book.image;

    if (req.file) {
        if (book.image) deleteFile(filename);
        filename = req.file.filename;
    }
    const newValue = {
        $set: {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            image: filename
        }
    }
    return await BookModel.findByIdAndUpdate(id, newValue).exec()
        .then((result) => res.redirect('/book'))
        .catch((err) => next(err));
}
module.exports.destroy = async (req, res, next) => {
    const id = req.body.id;
    await BookModel.findByIdAndRemove(id).exec()
        .then(result => {
            if (result.image) deleteFile(result.image);
            res.redirect('/book');
            console.log("deleted");
        })
        .catch(error => {
            next(error);
        });
}