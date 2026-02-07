const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Item = require('./models/Item');

dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const items = [
    { 
        name: 'Laptop', 
        status: 'available',
        description: 'High-performance laptop for work and gaming',
        price: 999.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
    },
    { 
        name: 'Smartphone', 
        status: 'available',
        description: 'Latest smartphone with advanced features',
        price: 699.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
    },
    { 
        name: 'Headphones', 
        status: 'available',
        description: 'Wireless noise-cancelling headphones',
        price: 199.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    { 
        name: 'Keyboard', 
        status: 'available',
        description: 'Mechanical gaming keyboard with RGB',
        price: 129.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop'
    },
    { 
        name: 'Mouse', 
        status: 'available',
        description: 'Ergonomic wireless mouse',
        price: 49.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'
    },
    { 
        name: 'Monitor', 
        status: 'available',
        description: '27-inch 4K UHD monitor',
        price: 399.99,
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop'
    },
    { 
        name: 'Office Chair', 
        status: 'available',
        description: 'Ergonomic office chair with lumbar support',
        price: 299.99,
        category: 'furniture',
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop'
    },
    { 
        name: 'Desk', 
        status: 'available',
        description: 'Modern standing desk with adjustable height',
        price: 449.99,
        category: 'furniture',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop'
    },
    { 
        name: 'Backpack', 
        status: 'available',
        description: 'Waterproof laptop backpack',
        price: 79.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    },
    { 
        name: 'Water Bottle', 
        status: 'available',
        description: 'Insulated stainless steel water bottle',
        price: 24.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop'
    },
    { 
        name: 'Notebook', 
        status: 'available',
        description: 'Premium leather-bound notebook',
        price: 19.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop'
    },
    { 
        name: 'Desk Lamp', 
        status: 'available',
        description: 'LED desk lamp with adjustable brightness',
        price: 39.99,
        category: 'furniture',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop'
    }
];

const seedDB = async () => {
    try {
        await Item.deleteMany({});
        await Item.insertMany(items);
        console.log('Items Seeded Successfully!');
        console.log(`${items.length} items added to database`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
