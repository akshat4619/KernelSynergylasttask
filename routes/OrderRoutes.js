const express = require('express');
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create Order
router.post('/', authenticateToken, async (req, res) => {
    const { user_id, product_id, quantity, order_date } = req.body; // Adding 'order_date' to match your table schema

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ message: 'Missing required fields: user_id, product_id, quantity' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO orders (user_id, product_id, quantity, order_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, product_id, quantity, order_date] // Include 'order_date' in the query
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error during order creation:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all Orders
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Order by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Order
router.put('/:id', authenticateToken, async (req, res) => {
    const { user_id, product_id, quantity, order_date } = req.body;

    if (!user_id || !product_id || !quantity || !order_date) {
        return res.status(400).json({ message: 'Missing required fields: user_id, product_id, quantity, order_date' });
    }

    try {
        const result = await pool.query(
            'UPDATE orders SET user_id = $1, product_id = $2, quantity = $3, order_date = $4 WHERE id = $5 RETURNING *',
            [user_id, product_id, quantity, order_date, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error during order update:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Order
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM orders WHERE id = $1', [req.params.id]);
        res.json({ message: 'Order deleted' });
    } catch (error) {
        console.error('Error during order deletion:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
