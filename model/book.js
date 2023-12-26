const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
    ISBN: { type: String, unique: true },
    title: String,
    //   authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
    authors: [String],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    //   publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication' },
    publication: Number
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

// Export the Book model
module.exports = Book;
