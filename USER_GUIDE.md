# User Guide - E-Commerce Demo

## Overview
This guide walks you through using the e-commerce demo application from a user's perspective.

## Application Flow

```
Start → Login/Signup → Items List → Add to Cart → Checkout → Order History
```

## Step-by-Step Guide

### Step 1: Access the Application

1. Open your browser
2. Navigate to http://localhost:3000
3. You'll see the Login screen

**What you'll see:**
- Login form with username and password fields
- "Sign Up" toggle link
- Clean, centered design with purple gradient background

### Step 2: Create an Account (First Time Users)

1. Click "Sign Up" link at the bottom
2. Enter a username (e.g., "john")
3. Enter a password (e.g., "password123")
4. Click "Sign Up" button

**Expected Result:**
- Green success message: "User registered successfully! Please login."
- Form automatically switches to Login mode
- Password field is cleared

**Possible Errors:**
- "User already exists" - Choose a different username

### Step 3: Login

1. Enter your username
2. Enter your password
3. Click "Login" button

**Expected Result:**
- You're redirected to the Items List screen
- Welcome message shows your username
- Items are displayed in a grid

**Possible Errors:**
- "Invalid credentials" - Check username/password
- "User already logged in on another device" - Logout from other device first

### Step 4: Browse Items

**What you'll see:**
- Header with "E-Commerce Demo" title
- Welcome message with your username
- Logout button
- Three action buttons: Cart, Order History, Checkout
- Grid of available items

**Items Display:**
- Each item shows:
  - Item name (e.g., "Laptop", "Smartphone")
  - Status (e.g., "available")
  - "Add to Cart" button

### Step 5: Add Items to Cart

1. Click "Add to Cart" on any item
2. Wait for confirmation message

**Expected Result:**
- Blue info message: "Item added to cart!"
- Message disappears after 3 seconds
- Item is now in your cart (not visible yet)

**Tips:**
- You can add the same item multiple times
- You can add different items
- No limit on cart size

### Step 6: View Your Cart

1. Click the "Cart" button at the top

**What you'll see:**
- "Your Cart" section appears
- List of all items you've added
- Each item shows its name
- If cart is empty: "Your cart is empty"

**Example Cart Display:**
```
Your Cart
- Laptop
- Smartphone
- Laptop
- Headphones
```

### Step 7: View Order History

1. Click the "Order History" button

**What you'll see:**
- "Order History" section appears
- List of your past orders
- Each order shows its Order ID
- If no orders: "No orders yet"

**Example Order History:**
```
Order History
- Order ID: 507f1f77bcf86cd799439011
- Order ID: 507f191e810c19729de860ea
```

### Step 8: Checkout

1. Make sure you have items in your cart
2. Click the "Checkout" button

**Expected Result:**
- Blue info message: "Order successful!"
- Your cart is converted to an order
- Cart is now empty
- Order appears in Order History

**Possible Errors:**
- "No active cart found" - Add items to cart first

### Step 9: Continue Shopping

After checkout:
1. Add more items to cart
2. A new cart is automatically created
3. Repeat the process

**Note:** Each user can have only one active cart at a time.

### Step 10: Logout

1. Click the "Logout" button in the header

**Expected Result:**
- You're redirected to Login screen
- Your session is ended
- Token is cleared from the system

## Feature Details

### Single Device Login

**What it means:**
- You can only be logged in on one device/browser at a time
- If you try to login elsewhere while already logged in, it will be denied

**How to test:**
1. Login in Chrome
2. Open Incognito/Private window
3. Try to login with same account
4. You'll see: "User already logged in on another device"
5. Logout from Chrome
6. Now you can login in Incognito

**Why this feature?**
- Enhanced security
- Prevents account sharing
- Ensures single active session

### Cart System

**How it works:**
- One active cart per user
- Add items by clicking "Add to Cart"
- View cart by clicking "Cart" button
- Cart persists until checkout

**Cart States:**
- Active: Current cart you're adding items to
- Ordered: Cart that has been converted to an order

### Order System

**How it works:**
- Checkout converts your active cart to an order
- Order is permanently saved
- Order ID is generated
- Cart is marked as "ordered"
- New cart is created for next purchase

**Order Information:**
- Order ID: Unique identifier
- Created date: When order was placed
- Associated cart: Which cart was converted

## User Interface Guide

### Login Screen

```
┌─────────────────────────────────────┐
│                                     │
│           Login / Sign Up           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Username: [____________]      │ │
│  │ Password: [____________]      │ │
│  │                               │ │
│  │      [Login/Sign Up]          │ │
│  └───────────────────────────────┘ │
│                                     │
│  Don't have an account? Sign Up     │
│                                     │
└─────────────────────────────────────┘
```

### Items List Screen

```
┌─────────────────────────────────────────────────────┐
│ E-Commerce Demo    Welcome, john!    [Logout]      │
├─────────────────────────────────────────────────────┤
│ [Cart] [Order History] [Checkout]                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Available Items                                     │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Laptop   │ │Smartphone│ │Headphones│           │
│ │available │ │available │ │available │           │
│ │[Add Cart]│ │[Add Cart]│ │[Add Cart]│           │
│ └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Keyboard │ │  Mouse   │ │ Monitor  │           │
│ │available │ │available │ │available │           │
│ │[Add Cart]│ │[Add Cart]│ │[Add Cart]│           │
│ └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Cart View

```
┌─────────────────────────────────────────────────────┐
│ E-Commerce Demo    Welcome, john!    [Logout]      │
├─────────────────────────────────────────────────────┤
│ [Cart] [Order History] [Checkout]                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Your Cart                                           │
│ ┌─────────────────────────────────────────────┐   │
│ │ - Laptop                                    │   │
│ │ - Smartphone                                │   │
│ │ - Headphones                                │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ Available Items                                     │
│ [Items grid continues below...]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Tips & Best Practices

### For Users

1. **Remember your credentials** - No password recovery yet
2. **Logout when done** - Allows login from other devices
3. **Check cart before checkout** - Can't undo checkout
4. **Save Order IDs** - For reference

### For Testing

1. **Test single device login** - Use incognito mode
2. **Add multiple items** - Test cart functionality
3. **Create multiple orders** - Test order history
4. **Try invalid credentials** - Test error handling

## Common User Scenarios

### Scenario 1: First Time User
1. Sign up with username and password
2. Login with credentials
3. Browse items
4. Add items to cart
5. View cart
6. Checkout
7. View order history
8. Logout

### Scenario 2: Returning User
1. Login with existing credentials
2. Add items to cart
3. Checkout
4. View order history (see all past orders)
5. Continue shopping

### Scenario 3: Multi-Device User
1. Login on Device A
2. Try to login on Device B → Denied
3. Logout from Device A
4. Login on Device B → Success

### Scenario 4: Shopping Session
1. Login
2. Add 5 items to cart
3. View cart (see all 5 items)
4. Checkout
5. Add 3 more items
6. View cart (see only 3 new items)
7. Checkout again
8. View order history (see 2 orders)

## Keyboard Shortcuts

- **Tab**: Navigate between fields
- **Enter**: Submit form
- **Escape**: Close alerts (if implemented)
- **F5**: Refresh page
- **Ctrl+Shift+R**: Hard refresh (clear cache)

## Browser Compatibility

Tested and working on:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari

## Mobile Responsiveness

The application is responsive and works on:
- Desktop (1920x1080 and above)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

## Accessibility

- Semantic HTML elements
- Keyboard navigation support
- Clear error messages
- Visible focus states
- Readable fonts and colors

## Data Privacy

- Passwords are hashed (not stored in plain text)
- Tokens expire after 1 hour
- No personal data collected beyond username
- Local storage used for token persistence

## Limitations

- No password recovery
- No email verification
- No profile editing
- No item quantities (each add = new row)
- No item prices or totals
- No payment processing
- No order cancellation
- No cart editing (can't remove items)

## Future Enhancements

Potential features (not implemented):
- Password reset
- Email notifications
- User profiles
- Item quantities
- Shopping cart editing
- Payment integration
- Order tracking
- Product search
- Product categories
- Wishlist
- Reviews and ratings
