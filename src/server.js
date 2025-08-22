const express = require('express');
const { Pool } = require('pg');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const client = require('prom-client');
require('dotenv').config();

const app = express();

// Simple Prometheus metrics setup
const register = new client.Registry();

// Basic metrics only
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code'],
  registers: [register]
});

// Simple middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      status_code: res.statusCode
    });
  });
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// PostgreSQL Connection Pool
const sqlDb = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DATABASE || 'library_db',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database middleware - makes connection available to all routes
app.use((req, res, next) => {
  req.db = sqlDb;
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/library_ebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch(error => {
  console.error('❌ MongoDB connection failed:', error.message);
});

// Simple metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Basic health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Library Management System API',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      customers: '/api/customers',
      ebooks: '/api/ebooks',
      health: '/health',
      metrics: '/metrics'
    }
  });
});

// Routes will be imported here
app.use('/api/books', require('./routes/books'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/ebooks', require('./routes/ebooks'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
