import express from 'express';
const router = express.Router();

let orders = [];

// POST - crea ordine (finto, salva in memoria)
router.post('/', (req, res) => {
  const order = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.total
  };
  orders.push(order);
  res.status(201).json({ message: 'Ordine ricevuto', order });
});

// GET - lista ordini (admin o utente, versione base)
router.get('/', (req, res) => {
  res.json(orders);
});

export default router;
