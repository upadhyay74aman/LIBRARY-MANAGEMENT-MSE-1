const Book = require('../models/Book');

exports.addBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
};

exports.searchBooks = async (req, res, next) => {
  try {
    const { title, author } = req.query;
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' }; // Subject says e: search by title or author
    }
    const books = await Book.find(query);
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};
