const mongoose = require('mongoose');

// Define the book schema
const authorSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    books:[Number]
});

// Create the Book model
const Author = mongoose.model('Author', authorSchema);

// Export the Book model
module.exports = Author;