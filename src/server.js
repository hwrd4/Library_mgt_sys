const express = require('express');
const mysql = require('mysql2');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL Connection
const sqlDb = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'library_db'
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_ebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes will be imported here
app.use('/api/books', require('./routes/books'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/ebooks', require('./routes/ebooks'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
