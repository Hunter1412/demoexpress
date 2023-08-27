const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String }
});

BookSchema.indexes();

module.exports = mongoose.model("books", BookSchema);