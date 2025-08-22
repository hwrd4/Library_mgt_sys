// API Base URL
const API_BASE = '/api';

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    loadEbooks();
    loadCustomers();
    
    // Add form event listeners
    document.getElementById('addBookForm').addEventListener('submit', addBook);
    document.getElementById('addEbookForm').addEventListener('submit', addEbook);
});

// Load and display books
async function loadBooks() {
    try {
        const response = await fetch(`${API_BASE}/books`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
        document.getElementById('booksList').innerHTML = '<p>Error loading books</p>';
    }
}

// Display books in table
function displayBooks(books) {
    const container = document.getElementById('booksList');
    
    if (books.length === 0) {
        container.innerHTML = '<p>No books found</p>';
        return;
    }
    
    const table = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Copies</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(book => `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td>${book.copies}</td>
                        <td>${new Date(book.created_at).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = table;
}

// Add new book
async function addBook(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const bookData = {
        title: form.elements[0].value,
        author: form.elements[1].value,
        isbn: form.elements[2].value,
        copies: parseInt(form.elements[3].value)
    };
    
    try {
        const response = await fetch(`${API_BASE}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        
        if (response.ok) {
            form.reset();
            loadBooks(); // Reload books list
            alert('Book added successfully!');
        } else {
            throw new Error('Failed to add book');
        }
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Error adding book');
    }
}

// Load and display ebooks
async function loadEbooks() {
    try {
        const response = await fetch(`${API_BASE}/ebooks`);
        const ebooks = await response.json();
        displayEbooks(ebooks);
    } catch (error) {
        console.error('Error loading ebooks:', error);
        document.getElementById('ebooksList').innerHTML = '<p>Error loading e-books</p>';
    }
}

// Display ebooks in table
function displayEbooks(ebooks) {
    const container = document.getElementById('ebooksList');
    
    if (ebooks.length === 0) {
        container.innerHTML = '<p>No e-books found</p>';
        return;
    }
    
    const table = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Format</th>
                    <th>File URL</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                ${ebooks.map(ebook => `
                    <tr>
                        <td>${ebook._id}</td>
                        <td>${ebook.title}</td>
                        <td>${ebook.author}</td>
                        <td>${ebook.isbn}</td>
                        <td>${ebook.format}</td>
                        <td><a href="${ebook.fileUrl}" target="_blank">Download</a></td>
                        <td>${new Date(ebook.createdAt).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = table;
}

// Add new ebook
async function addEbook(event) {
    event.preventDefault();
    
    const form = event.target;
    
    const ebookData = {
        title: form.elements[0].value,
        author: form.elements[1].value,
        isbn: form.elements[2].value,
        format: form.elements[3].value,
        fileUrl: form.elements[4].value
    };
    
    try {
        const response = await fetch(`${API_BASE}/ebooks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ebookData)
        });
        
        if (response.ok) {
            form.reset();
            loadEbooks(); // Reload ebooks list
            alert('E-book added successfully!');
        } else {
            throw new Error('Failed to add e-book');
        }
    } catch (error) {
        console.error('Error adding e-book:', error);
        alert('Error adding e-book');
    }
}

// Load customers (placeholder)
async function loadCustomers() {
    try {
        const response = await fetch(`${API_BASE}/customers`);
        const customers = await response.json();
        console.log('Customers loaded:', customers);
    } catch (error) {
        console.error('Error loading customers:', error);
    }
}