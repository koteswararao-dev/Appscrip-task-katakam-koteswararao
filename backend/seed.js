const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const items = [
    { name: 'Laptop', status: 'available' },
    { name: 'Smartphone', status: 'available' },
    { name: 'Headphones', status: 'available' },
    { name: 'Keyboard', status: 'available' },
    { name: 'Mouse', status: 'available' },
    { name: 'Monitor', status: 'available' },
    { name: 'Chair', status: 'available' },
    { name: 'Desk', status: 'available' }
];

const seedDB = async () => {
    try {
        await Item.deleteMany({});
        await Item.insertMany(items);
        console.log('Items Seeded');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
