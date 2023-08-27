const BookModel = require('../models/book.model');
const deleteFile = require('../Utils/fileImage');

class BookController {
    async getBooks() {
        let books = BookModel.find({}).exec();
        return books;
    };

    index = async (req, res, next) => {
        const books = await this.getBooks();
        return res.render('book/index', { books: books });
    };

    search = async (req, res, next) => {
        console.log(req);
        let title = req.method === 'POST' ? req.params.title : req.query.title;
        title = title.toLowerCase();
        if (!title) return res.redirect('/book');

        const books = await this.getBooks();
        const result = books.filter(item => item.title.toLowerCase().indexOf(title) >= 0);

        if (result.length === 0) {
            return res.render('book/index', {
                books: null,
                message: "Can't find " + title,
                type: "danger"
            });
        }
        return res.render('book/index', {
            books: result,
            message: "Search by keyword: " + title,
            type: "success"
        });
    };

    create = async (req, res, next) => {
        return await res.render('book/create');
    };

    store = async (req, res, next) => {
        const filename = req.file ? req.file.filename : '';
        const { title, author, price } = req.body;
        await BookModel.create({
            title: title,
            author: author,
            price: price,
            image: filename
        }).then((result) => {
            res.redirect('/book')
        }).catch((err) => {
            console.log(err);
            next(err)
        });
    };

    show = async (req, res, next) => {
        const id = req.params.id;
        return await BookModel.findById(id).exec()
            .then((result) => res.render('book/detail', { book: result }))
            .catch((err) => next(err))
    };

    edit = async (req, res, next) => {
        const id = req.params.id;
        return await BookModel.findById(id).exec()
            .then((result) => res.render('book/update', { book: result }))
            .catch((err) => next(err))
    };

    update = async (req, res, next) => {
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

        const { title, author, price } = req.body;
        const newValue = {
            $set: {
                title: title,
                author: author,
                price: price,
                image: filename
            }
        }
        return await BookModel.findByIdAndUpdate(id, newValue).exec()
            .then((result) => res.redirect('/book'))
            .catch((err) => next(err));
    };

    destroy = async (req, res, next) => {
        const id = req.body.id;
        await BookModel.findByIdAndRemove(id).exec()
            .then(result => {
                if (result.image) deleteFile(result.image);
                res.redirect('/book');
            })
            .catch(error => next(error));
    }
}


module.exports = new BookController();