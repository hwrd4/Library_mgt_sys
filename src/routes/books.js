const express = require('express');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const result = await req.db.query('SELECT * FROM books');
    res.json(result.rows);  // Changed from rows to result.rows
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, copies } = req.body;
    const result = await req.db.query(
      'INSERT INTO books (title, author, isbn, copies) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, author, isbn, copies]
    );
    res.status(201).json({ id: result.rows[0].id });  // Changed from result.insertId
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
