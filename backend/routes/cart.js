import express from 'express';
const router = express.Router();

let cart = [];

// GET - mostra il carrello
router.get('/', (req, res) => {
  res.json(cart);
});

// POST - aggiungi al carrello
router.post('/', (req, res) => {
  const item = req.body;
  cart.push(item);
  res.status(201).json({ message: 'Aggiunto al carrello', cart });
});

// DELETE - svuota carrello
router.delete('/', (req, res) => {
  cart = [];
  res.json({ message: 'Carrello svuotato' });
});

export default router;
