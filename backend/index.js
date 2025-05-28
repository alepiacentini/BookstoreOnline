import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // usa solo questa connessione

// Import routes
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Bookstore API is running!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Qualcosa è andato storto!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint non trovato' });
});

// Avvia DB e server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
  });
}).catch(err => {
  console.error('Impossibile avviare il server:', err.message);
});
