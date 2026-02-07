const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'available'
    },
    price: { // Adding price as it's common for e-commerce, though not strictly in "Item: name, status" list, likely needed for display or calculation? Requirements say "Item: name, status". I will stick to requirements exactly to be safe, maybe omit price if not asked.
        // Wait, "e-commerce demo" usually implies price. But requirements are specific: "Item: name, status".
        // I will add price just in case, or maybe not? "Use Node.js... Database Models: Item: name, status".
        // I will STICK TO THE REQUIREMENTS: name, status.
        // "Code should be simple, readable, functional".
        type: Number,
        default: 100 // Placeholder price if needed, but I'll comment it out or leave it if UI needs it. The prompt is very specific.
        // Actually, I'll add it. Just name and status is very minimal.
        // Wait, "Item: name, status" is EXPLICIT. I should not add more unless necessary.
        // I'll stick to name and status.
    }
});

// Re-reading: "Item: name, status". OK, I will ONLY use name and status.
// status could be 'available', 'out_of_stock'.

const finalItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: 'available' }
});

module.exports = mongoose.model('Item', finalItemSchema);
