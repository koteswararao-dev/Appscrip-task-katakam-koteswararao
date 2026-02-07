const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth'); // Optional for viewing? Req says "GET /items". Usually public. POST /items likely admin or public for demo?
// "POST /items" in API ENDPOINTS list. I'll make POST protected or public?
// Given "Code should be simple", I'll make GET public and POST public for simplicity unless implied otherwise. 
// Actually, usually creation is protected. But no "Admin" role specified. 
// I'll make POST public for easy seeding/demo, or require Auth.
// "GET /carts (list user's cart inputs)" requires Auth (implied by "user's").
// I'll assume POST /items is for setup and make it public for simplicity.

// GET /items - List all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /items - Create item
router.post('/', async (req, res) => {
    const { name, status } = req.body;
    try {
        const newItem = new Item({
            name,
            status: status || 'available'
        });
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
