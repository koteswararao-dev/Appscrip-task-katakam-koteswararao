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

        // Check if item already in cart? "Clicking an item adds it to the cart".
        // Usually we increment quantity, but CartItem model is simple: cart_id, item_id. 
        // And requirements: "CartItem: cart_id, item_id". No quantity.
        // So I will just add another row. Multiple rows = multiple quantity.
        // Or I could prevent duplicates if "One user can have only one active cart" implies single items? 
        // "Clicking an item adds it to the cart". Usually implies adding to list.
        // I'll allow duplicates (multiple rows) as the simplest interpretation of the schema.

        const cartItem = new CartItem({
            cart_id: cart._id,
            item_id: item_id
        });

        await cartItem.save();

        // Return cart items or just success? "POST /carts".
        // I'll return the added item.
        res.json(cartItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
