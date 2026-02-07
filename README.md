# E-Commerce Demo Project

A complete end-to-end e-commerce demo application with single device login authentication.

## Features

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication with single device login enforcement
- bcrypt password hashing
- RESTful API endpoints

### Frontend
- React (Create React App)
- Axios for API calls
- Clean and responsive UI
- Login/Signup screens
- Items listing with cart functionality
- Order management

### Security
- Single device login: Only one active session per user
- JWT token stored in User document
- Token verification on every protected route
- Automatic logout on token mismatch

## Database Models

- **User**: username, password (hashed), token
- **Item**: name, status
- **Cart**: user_id, status
- **CartItem**: cart_id, item_id
- **Order**: user_id, cart_id

## API Endpoints

### Users
- `POST /users` - Sign up
- `GET /users` - List all users
- `POST /users/login` - Login
- `POST /users/logout` - Logout (requires auth)

### Items
- `POST /items` - Create item
- `GET /items` - List all items

### Carts
- `POST /carts` - Add item to cart (requires auth)
- `GET /carts` - List user's cart items (requires auth)

### Orders
- `POST /orders` - Convert cart to order (requires auth)
- `GET /orders` - List user's orders (requires auth)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create/edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce-demo
JWT_SECRET=supersecretkey123
```

3. Start MongoDB:
```bash
# On Windows
net start MongoDB

# On Mac/Linux
sudo systemctl start mongod
```

4. Seed the database with sample items:
```bash
node backend/seed.js
```

5. Start the backend server:
```bash
node backend/server.js
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Create `.env` file in root directory:
```
REACT_APP_API_URL=http://localhost:5000
```

2. Start the React development server:
```bash
npm start
```

Frontend will run on http://localhost:3000

## Usage Guide

### 1. Sign Up / Login
- Open http://localhost:3000
- Create a new account or login with existing credentials
- If user is already logged in on another device, login will be denied

### 2. Browse Items
- After login, view all available items
- Click "Add to Cart" on any item to add it to your cart

### 3. View Cart
- Click "Cart" button to see items in your cart
- Cart shows all items you've added

### 4. View Order History
- Click "Order History" to see your past orders
- Shows order IDs for all completed orders

### 5. Checkout
- Click "Checkout" to convert your cart into an order
- Success message will appear
- Cart will be cleared after successful checkout

### 6. Logout
- Click "Logout" to end your session
- Token will be cleared from database

## Business Rules

- One user can have only one active cart at a time
- Clicking an item adds it to the cart
- Checkout converts the active cart into an order
- After order creation, the cart status changes to "ordered"
- User must create a new cart for subsequent purchases

## Single Device Login Implementation

The application enforces single device login through:

1. **Login**: Token is generated and stored in User document
2. **Existing Session Check**: If token exists and is valid, login is denied
3. **Auth Middleware**: Verifies JWT AND matches it with DB token
4. **Logout**: Clears token from User document
5. **Token Mismatch**: If tokens don't match, request is rejected

## Project Structure

```
├── backend/
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Item.js          # Item model
│   │   ├── Cart.js          # Cart model
│   │   ├── CartItem.js      # CartItem model
│   │   └── Order.js         # Order model
│   ├── routes/
│   │   ├── users.js         # User routes
│   │   ├── items.js         # Item routes
│   │   ├── carts.js         # Cart routes
│   │   └── orders.js        # Order routes
│   ├── .env                 # Environment variables
│   ├── seed.js              # Database seeding script
│   └── server.js            # Express server
├── src/
│   ├── components/
│   │   ├── Login.js         # Login/Signup component
│   │   ├── Login.css        # Login styles
│   │   ├── ItemsList.js     # Items listing component
│   │   └── ItemsList.css    # Items styles
│   ├── App.js               # Main app component
│   ├── App.css              # App styles
│   └── index.js             # React entry point
├── package.json
└── README.md
```

## Testing the Application

### Test Single Device Login

1. Login with a user account in one browser
2. Try to login with the same account in another browser/incognito window
3. You should see: "User already logged in on another device"
4. Logout from the first browser
5. Now you can login from the second browser

### Test Cart and Orders

1. Login to the application
2. Add multiple items to cart
3. Click "Cart" to verify items are added
4. Click "Checkout" to create an order
5. Click "Order History" to see the order ID
6. Try adding more items - a new cart will be created

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- dotenv - Environment variables

### Frontend
- React - UI library
- Axios - HTTP client
- CSS3 - Styling

## Notes

- This is a demo project for learning purposes
- In production, use HTTPS and secure JWT secrets
- Consider adding password strength validation
- Add input validation and sanitization
- Implement rate limiting for API endpoints
- Add proper error logging and monitoring
