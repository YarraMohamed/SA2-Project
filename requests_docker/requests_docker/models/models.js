const mongoose = require('mongoose');

// Define schema for the Book collection
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  // Add more fields as needed
});

// Create a model for the Book collection
const Book = mongoose.model('Book', bookSchema);

// Define schema for the User collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add more fields as needed
});

// Create a model for the User collection
const User = mongoose.model('User', userSchema);

// Define schema for the BookRequest collection
const bookRequestSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestStatus: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  // Add more fields as needed
});

// Create a model for the BookRequest collection
const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

// Export models to be used in other parts of your application
module.exports = { Book, User, BookRequest };
