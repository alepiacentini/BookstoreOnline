// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { createToken, verifyToken } from '../utils/jwt.js';

const router = express.Router();

// Registrazione
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password, username, isAdmin } = req.body;

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
      isAdmin: !!isAdmin // forza a booleano, anche se non è obbligatorio
    });

    await user.save();
    console.log("Utente salvato nel DB:", user);
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
    console.error(error); // Aggiunto per debug
    res.status(500).json({ error: 'Errore durante la registrazione' });
  }
});

//Login
router.post('/login', async (req, res) => {
  console.log('Dati ricevuti al login:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password sono obbligatori' });
  }

  const user = await User.findOne({ email });
  console.log("Utente trovato nel DB:", user);

  if (!user) {
    return res.status(400).json({ error: 'Utente non trovato' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Credenziali non valide' });
  }

  const token = createToken({ userId: user._id });
  console.log('Login riuscito per:', user.email);

    res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
});



// Endpoint per verificare il token
router.get('/check', async (req, res) => {
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

export default router;
