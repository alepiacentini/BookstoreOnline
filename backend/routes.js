// routes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { createToken, verifyToken } = require('./utils/jwt');
const User = require('./models/user.js');
const Book = require('./models/book.js');
const Order = require('./models/Order');

const router = express.Router();

// ==================== Auth Routes ====================
router.post('/auth/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email già registrata' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      isAdmin: email === 'admin@example.com' || isAdmin // puoi cambiare questa logica se vuoi
    });

    await user.save();
    const token = createToken({ userId: user._id });

    res.status(201).json({
      message: 'Registrazione completata',
      token,
      user: { 
        id: user._id, 
        firstname: user.firstname, 
        lastname: user.lastname,
        username: user.username,
        email: user.email, 
        isAdmin: user.isAdmin 
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la registrazione' });
  }
});

//Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenziali non valide' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Credenziali non valide' });
    }

    const token = createToken({ userId: user._id });
    
    res.json({
      message: 'Login effettuato',
      token,
      user: { 
        id: user._id, 
        firstname: user.firstname, 
        lastname: user.lastname,
        email: user.email, 
        isAdmin: user.isAdmin 
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il login' });
  }
});

router.get('/auth/check', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ valid: false });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ valid: false });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

// ==================== Book Routes ====================
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei libri' });
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Libro non trovato' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del libro' });
  }
});

router.post('/books', async (req, res) => {
  try {
    const { title, author, price, stock, genre} = req.body;
    
    // Verifica se l'utente è admin
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Accesso negato' });
    }

    const book = new Book({
      title,
      author,
      price, 
      stock,
      genre
    });
    
    await book.save();
    console.log("Dati ricevuti:", req.body);

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiunta del libro' });
  }
});


router.put('/books/:id', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token mancante o invalido' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Accesso negato. Solo admin.' });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ error: 'Libro non trovato' });
    }

    res.json(book);
  } catch (error) {
    console.error('Errore aggiornamento libro:', error);
    res.status(500).json({ error: 'Errore aggiornamento libro' });
  }
});



router.delete('/books/:id', async (req, res) => {
  try {
    // Verifica se l'utente è admin
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Accesso negato' });
    }

    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Libro non trovato' });
    }
    res.json({ message: 'Libro eliminato con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'eliminazione del libro' });
  }
});

// ==================== Cart Routes ====================
router.get('/cart', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).populate('cart.items.bookId');
    
    res.json(user.cart.items);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero del carrello' });
  }
});

router.post('/cart/add', async (req, res) => {
  try {
    const { bookId } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Libro non trovato' });
    }

    const existingItem = user.cart.items.find(item => item.bookId.toString() === bookId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.items.push({ bookId, quantity: 1 });
    }

    await user.save();
    const updatedUser = await User.findById(user._id).populate('cart.items.bookId');
    res.json(updatedUser.cart.items);
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiunta al carrello' });
  }
});

router.delete('/cart/remove/:bookId', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    user.cart.items = user.cart.items.filter(item => item.bookId.toString() !== req.params.bookId);
    await user.save();
    
    const updatedUser = await User.findById(user._id).populate('cart.items.bookId');
    res.json(updatedUser.cart.items);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella rimozione dal carrello' });
  }
});

router.delete('/cart/clear', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    user.cart.items = [];
    await user.save();
    res.json({ message: 'Carrello svuotato' });
  } catch (error) {
    res.status(500).json({ error: 'Errore nello svuotamento del carrello' });
  }
});

// ==================== Order Routes ====================
router.post('/orders', async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).populate('cart.items.bookId');
    
    if (user.cart.items.length === 0) {
      return res.status(400).json({ error: 'Il carrello è vuoto' });
    }

    const items = user.cart.items.map(item => ({
      bookId: item.bookId._id,
      titolo: item.bookId.titolo,
      autore: item.bookId.autore,
      prezzo: item.bookId.prezzo,
      quantity: item.quantity
    }));

    const totalAmount = items.reduce((sum, item) => sum + (item.prezzo * item.quantity), 0);

    const order = new Order({
      userId: user._id,
      items,
      totalAmount,
      shippingAddress
    });

    await order.save();
    
    // Svuota il carrello
    user.cart.items = [];
    await user.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione dell\'ordine' });
  }
});

router.get('/orders/my-orders', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const orders = await Order.find({ userId: decoded.userId }).populate('items.bookId');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero degli ordini' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Accesso negato' });
    }

    const orders = await Order.find().populate('userId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero degli ordini' });
  }
});

module.exports = router;