# API Testing with cURL

Test the backend API endpoints using these cURL commands.

## Setup
Make sure the backend server is running on http://localhost:5000

## Users API

### 1. Sign Up (Create User)
```bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

### 2. List All Users
```bash
curl http://localhost:5000/users
```

### 3. Login
```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

Save the token from the response for authenticated requests.

### 4. Logout (Replace YOUR_TOKEN)
```bash
curl -X POST http://localhost:5000/users/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Items API

### 5. Create Item
```bash
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Item\",\"status\":\"available\"}"
```

### 6. List All Items
```bash
curl http://localhost:5000/items
```

## Carts API (Requires Authentication)

### 7. Add Item to Cart (Replace YOUR_TOKEN and ITEM_ID)
```bash
curl -X POST http://localhost:5000/carts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{\"item_id\":\"ITEM_ID\"}"
```

### 8. View Cart Items
```bash
curl http://localhost:5000/carts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Orders API (Requires Authentication)

### 9. Create Order (Checkout)
```bash
curl -X POST http://localhost:5000/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 10. View Order History
```bash
curl http://localhost:5000/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Testing Single Device Login

1. Login and save the token:
```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

2. Try to login again (should fail):
```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

Expected response: `{"message":"User already logged in on another device"}`

3. Logout:
```bash
curl -X POST http://localhost:5000/users/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

4. Now login should work again.

## PowerShell Commands (Windows)

If using PowerShell, use `Invoke-RestMethod`:

### Sign Up
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/users" -Method Post -ContentType "application/json" -Body '{"username":"testuser","password":"password123"}'
```

### Login
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5000/users/login" -Method Post -ContentType "application/json" -Body '{"username":"testuser","password":"password123"}'
$token = $response.token
```

### Add to Cart
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/carts" -Method Post -ContentType "application/json" -Headers @{Authorization="Bearer $token"} -Body '{"item_id":"ITEM_ID"}'
```
