# Library Management System

A web-based library management system with support for both physical books and e-books.

## Features

- Manage physical books (MySQL)
- Manage e-books (MongoDB)
- Customer management
- Book lending system
- Docker support for easy deployment

## Prerequisites

- Node.js
- Docker and Docker Compose
- MySQL
- MongoDB

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application using Docker:
   ```bash
   docker-compose up --build
   ```

The application will be available at http://localhost:3000

## Database Structure

### MySQL (Physical Books & Customers)
- Books table
- Customers table
- Loans table

### MongoDB (E-Books)
- E-books collection

## API Endpoints

### Books
- GET /api/books - Get all books
- POST /api/books - Add a new book

### E-Books
- GET /api/ebooks - Get all e-books
- POST /api/ebooks - Add a new e-book

### Customers
- GET /api/customers - Get all customers
- POST /api/customers - Add a new customer
