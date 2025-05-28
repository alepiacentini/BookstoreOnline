const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    // Registrazione utente
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            
            // Verifica se l'utente esiste già
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash della password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Creazione nuovo utente
            const user = new User({
                username,
                email,
                password: hashedPassword
            });

            await user.save();

            // Creazione token
            const token = jwt.sign(
                { userId: user._id, isAdmin: user.isAdmin },
                process.env.JWT_KEY,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Login utente
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Trova l'utente
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Verifica password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Crea token
            const token = jwt.sign(
                { userId: user._id, isAdmin: user.isAdmin },
                process.env.JWT_KEY,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Ottieni profilo utente
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = authController;