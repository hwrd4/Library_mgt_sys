const express = require('express');
const router = express.Router();
const Ebook = require('../models/ebook');

// Get all ebooks
router.get('/', async (req, res) => {
  try {
    const ebooks = await Ebook.find();
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new ebook
router.post('/', async (req, res) => {
  try {
    const ebook = new Ebook(req.body);
    await ebook.save();
    res.status(201).json(ebook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
