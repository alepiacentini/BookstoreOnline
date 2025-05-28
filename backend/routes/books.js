import express from 'express';
import Book from '../models/book.js';

const router = express.Router();

// GET tutti i libri
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dei libri' });
  }
});

// POST - solo per admin - aggiungi un libro
router.post('/', async (req, res) => {
  try {
    const nuovoLibro = new Book(req.body);
    const libroSalvato = await nuovoLibro.save();
    res.status(201).json(libroSalvato);
  } catch (error) {
    console.error("Errore durante la creazione del libro:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// PUT - modifica libro (admin)
router.put('/books/:id', async (req, res) => {
  try {
    // 1. Estrae il token JWT dall'header "Authorization"
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Non autorizzato' });
    }

    // 2. Verifica e decodifica il token
    const decoded = verifyToken(token);

    // 3. Trova l'utente nel database
    const user = await User.findById(decoded.userId);
    
    // 4. Controlla che sia un admin
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Accesso negato' });
    }

    // 5. Aggiorna il libro con i dati del body, restituendo il nuovo oggetto aggiornato
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // 6. Se il libro non esiste, restituisce errore
    if (!book) {
      return res.status(404).json({ error: 'Libro non trovato' });
    }

    // 7. Risponde con il libro aggiornato
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento del libro' });
  }
});


// DELETE - elimina libro (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Libro eliminato' });
  } catch (err) {
    res.status(400).json({ error: 'Errore nella cancellazione del libro' });
  }
});

export default router;
