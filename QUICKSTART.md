# Quick Start Guide

## Start the Application in 3 Steps

### Step 1: Start MongoDB
Make sure MongoDB is running on your system.

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

### Step 2: Seed Database & Start Backend
Open a terminal and run:
```bash
npm run seed
npm run server
```

Backend will start on http://localhost:5000

### Step 3: Start Frontend
Open another terminal and run:
```bash
npm start
```

Frontend will open automatically at http://localhost:3000

## First Time Use

1. Click "Sign Up" and create an account
2. Login with your credentials
3. Browse items and click "Add to Cart"
4. Click "Cart" to view your items
5. Click "Checkout" to place an order
6. Click "Order History" to see your orders

## Test Single Device Login

1. Login in one browser
2. Try to login with same account in another browser
3. You'll see: "User already logged in on another device"
4. Logout from first browser to login elsewhere

That's it! Enjoy the demo.
