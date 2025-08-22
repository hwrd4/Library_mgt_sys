CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    copies INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    customer_id INTEGER REFERENCES customers(id),
    borrow_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'borrowed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO books (title, author, isbn, copies) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 3),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 2),
('1984', 'George Orwell', '9780451524935', 4)
ON CONFLICT (isbn) DO NOTHING;

INSERT INTO customers (name, email, phone, address) VALUES 
('John Doe', 'john@example.com', '123-456-7890', '123 Main St'),
('Jane Smith', 'jane@example.com', '098-765-4321', '456 Oak Ave')
ON CONFLICT (email) DO NOTHING;
