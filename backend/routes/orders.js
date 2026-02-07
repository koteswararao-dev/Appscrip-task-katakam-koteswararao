const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

router.use(auth);

// GET /orders - List user's orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /orders - Convert cart to order (Checkout)
router.post('/', async (req, res) => {
    try {
        // Find active cart
        const cart = await Cart.findOne({ user_id: req.user.id, status: 'active' });
        if (!cart) {
            return res.status(400).json({ message: 'No active cart found' });
        }

        // Create Order
        const order = new Order({
            user_id: req.user.id,
            cart_id: cart._id
        });
        await order.save();

        // Update Cart status to 'ordered'
        cart.status = 'ordered';
        await cart.save();

        res.json({ message: 'Order placed successfully', orderId: order._id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
