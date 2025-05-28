const Order = require('../models/Order');
const Book = require('../models/Book');

const orderController = {
    // Crea nuovo ordine
    createOrder: async (req, res) => {
        try {
            const { books } = req.body;
            let total = 0;

            // Calcola il totale e verifica lo stock
            for (let item of books) {
                const book = await Book.findById(item.bookId);
                if (!book) {
                    return res.status(404).json({ message: `Book ${item.bookId} not found` });
                }
                if (book.stock < item.quantity) {
                    return res.status(400).json({ message: `Insufficient stock for ${book.title}` });
                }
                total += book.price * item.quantity;
                
                // Aggiorna lo stock
                book.stock -= item.quantity;
                await book.save();
            }

            const order = new Order({
                userId: req.user.userId,
                books,
                total
            });

            await order.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Ottieni ordini dell'utente
    getUserOrders: async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.user.userId })
                .populate('books.bookId')
                .sort({ date: -1 });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Ottieni tutti gli ordini (solo admin)
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find()
                .populate('userId', 'username email')
                .populate('books.bookId')
                .sort({ date: -1 });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Aggiorna stato ordine (solo admin)
    updateOrderStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.json(order);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Ottieni dettagli di un ordine specifico
    getOrderById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate('userId', 'username email')
                .populate('books.bookId');

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Verifica che l'utente sia il proprietario dell'ordine o un admin
            if (order.userId._id.toString() !== req.user.userId && !req.user.isAdmin) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            res.json(order);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = orderController;