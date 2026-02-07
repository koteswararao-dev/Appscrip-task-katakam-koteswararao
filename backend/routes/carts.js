const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// All cart routes should be protected
router.use(auth);

// GET /carts - List user's active cart items
router.get('/', async (req, res) => {
    try {
        // Find active cart for user
        let cart = await Cart.findOne({ user_id: req.user.id, status: 'active' });

        if (!cart) {
            return res.json([]); // No cart, empty items
        }

        const cartItems = await CartItem.find({ cart_id: cart._id }).populate('item_id');
        res.json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /carts - Add item to cart
router.post('/', async (req, res) => {
    const { item_id } = req.body;

    try {
        // Check if item exists
        const item = await Item.findById(item_id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Find or create active cart
        let cart = await Cart.findOne({ user_id: req.user.id, status: 'active' });
        if (!cart) {
            cart = new Cart({ user_id: req.user.id, status: 'active' });
            await cart.save();
        }

        const cartItem = new CartItem({
            cart_id: cart._id,
            item_id: item_id
        });

        await cartItem.save();
        res.json(cartItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /carts/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        const cartItem = await CartItem.findById(req.params.id);
        
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Verify the cart belongs to the user
        const cart = await Cart.findById(cartItem.cart_id);
        if (!cart || cart.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await CartItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed from cart' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
