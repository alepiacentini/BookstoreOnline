const Book = require('../models/Book');

const bookController = {
    // Ottieni tutti i libri
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.json(books);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Ottieni un libro specifico
    getBookById: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Crea nuovo libro (solo admin)
    createBook: async (req, res) => {
        try {
            const { title, author, price, stock, genre } = req.body;

            const book = new Book({
                title,
                author,
                price,
                stock,
                genre
            });

            await book.save();
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Aggiorna libro (solo admin)
    updateBook: async (req, res) => {
        try {
            const book = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json(book);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Elimina libro (solo admin)
    deleteBook: async (req, res) => {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Cerca libri per genere
    getBooksByGenre: async (req, res) => {
        try {
            const books = await Book.find({ genre: req.params.genre });
            res.json(books);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Cerca libri per autore
    getBooksByAuthor: async (req, res) => {
        try {
            const books = await Book.find({ author: req.params.author });
            res.json(books);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = bookController;