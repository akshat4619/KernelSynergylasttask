const orderModel = require('../models/orderModel');

// Create Order
const createOrder = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newOrder = await orderModel.createOrder(user_id, product_id, quantity);
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.getOrderById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, product_id, quantity } = req.body;

        const updatedOrder = await orderModel.updateOrder(id, user_id, product_id, quantity);
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found or not updated' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await orderModel.deleteOrder(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};

