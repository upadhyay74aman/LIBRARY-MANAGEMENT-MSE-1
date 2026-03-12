const express = require('express');
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');

const router = express.Router();

// Note: /search must be placed before /:id so it's not treated as an ID
router.get('/search', searchBooks);
router.post('/', addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
