const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Get all books
router.get('/', async (req, res) => {
  try {
    const [rows] = await req.db.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, copies } = req.body;
    const [result] = await req.db.query(
      'INSERT INTO books (title, author, isbn, copies) VALUES (?, ?, ?, ?)',
      [title, author, isbn, copies]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
