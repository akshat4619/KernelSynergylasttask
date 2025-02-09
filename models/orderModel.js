const db = require('../config/db');

// Create Order
const createOrder = async (user_id, product_id, quantity) => {
  const result = await db.query(
    'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
    [user_id, product_id, quantity]
  );
  return result.rows[0];
};

// Get All Orders
const getAllOrders = async () => {
  const result = await db.query('SELECT * FROM orders');
  return result.rows;
};

// Get Order by ID
const getOrderById = async (id) => {
  const result = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
  return result.rows[0];
};

// Update Order
const updateOrder = async (id, user_id, product_id, quantity) => {
  const result = await db.query(
    'UPDATE orders SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *',
    [user_id, product_id, quantity, id]
  );
  return result.rows[0];
};

// Delete Order
const deleteOrder = async (id) => {
  const result = await db.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };

