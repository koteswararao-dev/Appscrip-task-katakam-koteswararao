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
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: 'general'
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Item', itemSchema);
