# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│                    (React Frontend)                         │
│                   http://localhost:3000                     │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │  Login   │  │  Items   │  │   Cart   │                │
│  │  Screen  │  │  Screen  │  │  Orders  │                │
│  └──────────┘  └──────────┘  └──────────┘                │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/HTTPS (Axios)
                          │ Authorization: Bearer <token>
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                         SERVER                              │
│                   (Express.js Backend)                      │
│                   http://localhost:5000                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              API Routes                              │ │
│  │  /users  /items  /carts  /orders                    │ │
│  └──────────────────────────────────────────────────────┘ │
│                          │                                  │
│  ┌──────────────────────────────────────────────────────┐ │
│  │         Authentication Middleware                    │ │
│  │  - Verify JWT                                        │ │
│  │  - Match token with DB                               │ │
│  └──────────────────────────────────────────────────────┘ │
│                          │                                  │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              Business Logic                          │ │
│  │  - User management                                   │ │
│  │  - Cart operations                                   │ │
│  │  - Order processing                                  │ │
│  └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE                              │
│                   (MongoDB)                                 │
│              mongodb://localhost:27017                      │
│                                                             │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌──────────┐        │
│  │  User  │  │  Item  │  │  Cart  │  │CartItem  │        │
│  └────────┘  └────────┘  └────────┘  └──────────┘        │
│                              │                              │
│                         ┌────────┐                         │
│                         │ Order  │                         │
│                         └────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. User Login Flow

```
User enters credentials
        │
        ▼
Frontend sends POST /users/login
        │
        ▼
Backend validates credentials
        │
        ├─── Invalid ──────► Return 400 error
        │
        ├─── Token exists ─► Return 403 "Already logged in"
        │
        └─── Valid ────────► Generate JWT
                             │
                             ▼
                        Save token to User.token
                             │
                             ▼
                        Return token to client
                             │
                             ▼
                    Client stores in localStorage
                             │
                             ▼
                        Redirect to Items page
```

### 2. Add to Cart Flow

```
User clicks "Add to Cart"
        │
        ▼
Frontend sends POST /carts
  with Authorization header
        │
        ▼
Auth Middleware verifies token
        │
        ├─── No token ─────► Return 401
        │
        ├─── Invalid JWT ──► Return 401
        │
        ├─── Token mismatch ► Return 401 "Logged in elsewhere"
        │
        └─── Valid ────────► Continue
                             │
                             ▼
                    Find or create active cart
                             │
                             ▼
                    Create CartItem record
                             │
                             ▼
                    Return success
                             │
                             ▼
                    Show "Item added" message
```

### 3. Checkout Flow

```
User clicks "Checkout"
        │
        ▼
Frontend sends POST /orders
  with Authorization header
        │
        ▼
Auth Middleware verifies token
        │
        └─── Valid ────────► Continue
                             │
                             ▼
                    Find active cart
                             │
                             ├─── No cart ──► Return 400 error
                             │
                             └─── Cart found ► Create Order
                                              │
                                              ▼
                                         Update cart.status = 'ordered'
                                              │
                                              ▼
                                         Return order ID
                                              │
                                              ▼
                                    Show "Order successful"
```

## Data Relationships

```
User (1) ──────────────────► (N) Cart
  │                              │
  │                              │
  │                              ▼
  │                          CartItem (N)
  │                              │
  │                              │
  │                              ▼
  │                          Item (1)
  │
  │
  └──────────────────────────► (N) Order
                                  │
                                  │
                                  ▼
                              Cart (1)
```

### Relationships Explained

- **User → Cart**: One user can have multiple carts (but only one active)
- **Cart → CartItem**: One cart contains multiple cart items
- **CartItem → Item**: Each cart item references one item
- **User → Order**: One user can have multiple orders
- **Order → Cart**: Each order references one cart

## Authentication Flow

```
┌──────────────────────────────────────────────────────────┐
│                    Login Process                         │
└──────────────────────────────────────────────────────────┘

1. User submits credentials
   ↓
2. Server validates username/password (bcrypt.compare)
   ↓
3. Check if user.token exists
   ↓
4. If token exists → Verify it
   ↓
   ├─ Valid token → Reject login (403)
   └─ Invalid/Expired → Continue
   ↓
5. Generate new JWT token
   ↓
6. Save token to user.token field
   ↓
7. Return token to client

┌──────────────────────────────────────────────────────────┐
│              Protected Route Access                      │
└──────────────────────────────────────────────────────────┘

1. Client sends request with Authorization header
   ↓
2. Middleware extracts token
   ↓
3. Verify JWT signature
   ↓
4. Decode token to get user ID
   ↓
5. Fetch user from database
   ↓
6. Compare request token with user.token
   ↓
   ├─ Match → Allow access
   └─ Mismatch → Reject (401)

┌──────────────────────────────────────────────────────────┐
│                   Logout Process                         │
└──────────────────────────────────────────────────────────┘

1. Client sends logout request with token
   ↓
2. Middleware verifies token
   ↓
3. Set user.token = null
   ↓
4. Save user document
   ↓
5. Return success
   ↓
6. Client clears localStorage
```

## Component Hierarchy

```
App
 │
 ├─── Login (if not authenticated)
 │     │
 │     ├─── Login Form
 │     └─── Signup Form
 │
 └─── ItemsList (if authenticated)
       │
       ├─── Header
       │     ├─── User Info
       │     └─── Logout Button
       │
       ├─── Action Buttons
       │     ├─── Cart Button
       │     ├─── Order History Button
       │     └─── Checkout Button
       │
       ├─── Cart Section (conditional)
       │     └─── Cart Items List
       │
       ├─── Orders Section (conditional)
       │     └─── Orders List
       │
       └─── Items Grid
             └─── Item Cards
                   ├─── Item Name
                   ├─── Item Status
                   └─── Add to Cart Button
```

## State Management

```
┌─────────────────────────────────────────────────────────┐
│                    App Component                        │
│                                                         │
│  State:                                                 │
│  - token (from localStorage)                            │
│  - user (from localStorage)                             │
│                                                         │
│  Methods:                                               │
│  - handleLogin(token, user)                             │
│  - handleLogout()                                       │
└─────────────────────────────────────────────────────────┘
                    │
                    ├─────────────────────────┐
                    │                         │
                    ▼                         ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   Login Component        │   │  ItemsList Component     │
│                          │   │                          │
│  State:                  │   │  State:                  │
│  - isSignup              │   │  - items[]               │
│  - username              │   │  - cartItems[]           │
│  - password              │   │  - orders[]              │
│  - error                 │   │  - showCart              │
│  - success               │   │  - showOrders            │
│                          │   │  - message               │
│  Methods:                │   │                          │
│  - handleSubmit()        │   │  Methods:                │
│                          │   │  - fetchItems()          │
│                          │   │  - fetchCart()           │
│                          │   │  - fetchOrders()         │
│                          │   │  - addToCart(itemId)     │
│                          │   │  - checkout()            │
└──────────────────────────┘   └──────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Security Stack                       │
└─────────────────────────────────────────────────────────┘

Layer 1: Password Hashing
  - bcrypt with salt rounds
  - Passwords never stored in plain text

Layer 2: JWT Token
  - Signed with secret key
  - Contains user ID
  - Expires after 1 hour

Layer 3: Database Token Storage
  - Token stored in User document
  - Single source of truth

Layer 4: Token Verification
  - Verify JWT signature
  - Match with database token
  - Reject if mismatch

Layer 5: Single Device Enforcement
  - Check existing token on login
  - Deny if valid token exists
  - Clear token on logout
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│  - React 19.2.0                                         │
│  - Axios 1.13.1                                         │
│  - CSS3                                                 │
│  - localStorage for token persistence                   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ REST API
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Backend                            │
│  - Node.js 22.16.0                                      │
│  - Express.js 5.2.1                                     │
│  - jsonwebtoken 9.0.3                                   │
│  - bcryptjs 3.0.3                                       │
│  - cors 2.8.6                                           │
│  - dotenv 17.2.4                                        │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Database                           │
│  - MongoDB 9.1.6                                        │
│  - Mongoose ODM                                         │
└─────────────────────────────────────────────────────────┘
```
