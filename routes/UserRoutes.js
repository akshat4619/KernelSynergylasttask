const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { generateToken, authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;  // Changed from username to name and email

    try {
        console.log('Inserting user:', email);  // Log the incoming request
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',  // Updated query
            [name, email, hashedPassword]
        );
        
        console.log('User inserted:', result.rows[0]);  // Log the result
        const user = result.rows[0];
        const token = generateToken(user);
        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during registration:', error);  // Log the error details
        res.status(500).json({ message: 'Server error' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;  // Changed from username to email

    try {
        console.log('Login attempt for user:', email);  // Log the login attempt
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);  // Search by email

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);  // Log the error details
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users (Protected Route)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error('Error during fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a user
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error during deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
