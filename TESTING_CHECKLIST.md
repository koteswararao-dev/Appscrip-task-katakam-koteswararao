# Testing Checklist

## Backend API Testing

### Users Endpoints
- [ ] POST /users - Create new user (signup)
- [ ] GET /users - List all users
- [ ] POST /users/login - Login with valid credentials
- [ ] POST /users/login - Login fails with invalid credentials
- [ ] POST /users/login - Login denied when already logged in elsewhere
- [ ] POST /users/logout - Logout successfully

### Items Endpoints
- [ ] POST /items - Create new item
- [ ] GET /items - List all items

### Carts Endpoints (Requires Authentication)
- [ ] POST /carts - Add item to cart
- [ ] GET /carts - View cart items
- [ ] POST /carts - Fails without token

### Orders Endpoints (Requires Authentication)
- [ ] POST /orders - Create order from cart
- [ ] GET /orders - View order history
- [ ] POST /orders - Fails without active cart

## Frontend Testing

### Login Screen
- [ ] Sign up with new username
- [ ] Login with valid credentials
- [ ] Alert shows on invalid credentials
- [ ] Alert shows "User already logged in on another device"
- [ ] Toggle between Login and Sign Up forms

### Items List Screen
- [ ] All items are displayed
- [ ] Clicking item adds to cart
- [ ] Success message shows when item added
- [ ] Cart button shows cart items
- [ ] Order History button shows orders
- [ ] Checkout button creates order
- [ ] "Order successful" message appears after checkout

### Single Device Login
- [ ] Login in Browser 1
- [ ] Try login in Browser 2 (Incognito) - Should fail
- [ ] Logout from Browser 1
- [ ] Login in Browser 2 - Should succeed

### Cart Functionality
- [ ] Add multiple items to cart
- [ ] View cart shows all added items
- [ ] Cart is empty initially
- [ ] Cart clears after checkout

### Order Functionality
- [ ] Order History is empty initially
- [ ] After checkout, order appears in history
- [ ] Order ID is displayed
- [ ] Multiple orders can be created

## Business Logic Testing

- [ ] One user can have only one active cart
- [ ] Clicking item adds it to cart
- [ ] Checkout converts cart to order
- [ ] After order, cart status changes to "ordered"
- [ ] New cart is created for next purchase

## Security Testing

- [ ] JWT token is required for protected routes
- [ ] Token must match database token
- [ ] Logout clears token from database
- [ ] Password is hashed in database
- [ ] Token mismatch returns 401 error

## Error Handling

- [ ] Invalid credentials show proper error
- [ ] Missing token returns 401
- [ ] Invalid token returns 401
- [ ] Checkout without cart shows error
- [ ] Network errors are handled gracefully
