# Troubleshooting Guide

## Common Issues and Solutions

### MongoDB Connection Issues

#### Problem: "MongoDB connection error"
**Solution:**
1. Make sure MongoDB is installed
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```
3. Verify MongoDB is running:
   ```bash
   # Check if MongoDB is listening on port 27017
   netstat -an | findstr 27017
   ```

#### Problem: "Connection refused to localhost:27017"
**Solution:**
- Check if MongoDB service is running
- Verify MONGO_URI in backend/.env is correct
- Try connecting with MongoDB Compass to test connection

### Backend Issues

#### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

#### Problem: "Port 5000 already in use"
**Solution:**
1. Change PORT in backend/.env to another port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

#### Problem: "JWT_SECRET is not defined"
**Solution:**
- Make sure backend/.env file exists
- Verify JWT_SECRET is set in backend/.env
- Restart the backend server

### Frontend Issues

#### Problem: "Cannot connect to backend"
**Solution:**
1. Verify backend is running on http://localhost:5000
2. Check REACT_APP_API_URL in .env file
3. Check browser console for CORS errors
4. Restart frontend: `npm start`

#### Problem: "Network Error" when making API calls
**Solution:**
1. Check if backend server is running
2. Verify API_URL is correct
3. Check browser console for errors
4. Try accessing http://localhost:5000 directly in browser

#### Problem: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Authentication Issues

#### Problem: "Token is not valid"
**Solution:**
1. Logout and login again
2. Clear localStorage:
   ```javascript
   // In browser console
   localStorage.clear()
   ```
3. Verify JWT_SECRET is same in .env

#### Problem: "User already logged in on another device" but I'm not
**Solution:**
1. The token might be stuck in database
2. Manually clear it:
   ```javascript
   // In MongoDB shell or Compass
   db.users.updateOne(
     { username: "your-username" },
     { $set: { token: null } }
   )
   ```

#### Problem: "Session invalid or logged in on another device"
**Solution:**
- This means the token in your browser doesn't match the database
- Logout and login again
- Or clear localStorage and refresh

### Cart/Order Issues

#### Problem: "No active cart found" when checking out
**Solution:**
- Add at least one item to cart before checkout
- Verify items were added successfully

#### Problem: Cart items not showing
**Solution:**
1. Check if items were added (look for success message)
2. Verify token is valid
3. Check browser console for errors
4. Try refreshing the page

### Database Issues

#### Problem: "No items showing"
**Solution:**
```bash
# Run the seed script
npm run seed
```

#### Problem: "Duplicate key error"
**Solution:**
- Username already exists
- Try a different username
- Or clear the database:
  ```bash
  # In MongoDB shell
  use ecommerce-demo
  db.dropDatabase()
  # Then run seed script again
  npm run seed
  ```

### Development Issues

#### Problem: Changes not reflecting
**Solution:**
1. For backend: Restart server (Ctrl+C, then `npm run server`)
2. For frontend: Clear cache and hard reload (Ctrl+Shift+R)
3. Check if you're editing the correct file

#### Problem: "npm start" opens wrong app
**Solution:**
- Make sure you're in the correct directory
- Frontend: Run from project root
- Backend: Run `npm run server` from project root

### Browser Issues

#### Problem: "CORS policy" error
**Solution:**
1. Verify backend has CORS enabled (it should by default)
2. Check if backend is running
3. Try a different browser
4. Clear browser cache

#### Problem: Login works but page doesn't redirect
**Solution:**
1. Check browser console for errors
2. Verify token is being saved to localStorage
3. Hard refresh the page (Ctrl+Shift+R)

### Windows-Specific Issues

#### Problem: "npm: command not found"
**Solution:**
- Install Node.js from https://nodejs.org
- Restart terminal after installation

#### Problem: Scripts not running
**Solution:**
- Use PowerShell or Command Prompt (not Git Bash)
- Run as Administrator if needed

#### Problem: MongoDB not starting
**Solution:**
```bash
# Install MongoDB as a service
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --install
net start MongoDB
```

## Debugging Tips

### Check Backend Logs
Look at the terminal where backend is running for error messages.

### Check Frontend Console
Open browser DevTools (F12) and check Console tab for errors.

### Test API Directly
Use curl or Postman to test API endpoints:
```bash
curl http://localhost:5000/items
```

### Check Database
Use MongoDB Compass to view database contents:
1. Connect to mongodb://localhost:27017
2. Select ecommerce-demo database
3. Browse collections

### Verify Environment Variables
```bash
# Backend
type backend\.env

# Frontend
type .env
```

### Check Ports
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :5000
lsof -i :3000
```

## Getting Help

If you're still stuck:

1. Check the error message carefully
2. Search the error on Google/Stack Overflow
3. Review the code in the relevant file
4. Check if all dependencies are installed
5. Try restarting everything:
   - Stop backend and frontend
   - Restart MongoDB
   - Clear node_modules and reinstall
   - Start fresh

## Reset Everything

If all else fails, complete reset:

```bash
# Stop all servers (Ctrl+C in terminals)

# Clear database
# In MongoDB shell:
use ecommerce-demo
db.dropDatabase()

# Clear frontend
rmdir /s /q node_modules
del package-lock.json
npm install

# Seed database
npm run seed

# Start backend
npm run server

# In new terminal, start frontend
npm start
```

## Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# List running processes
tasklist | findstr node

# Kill Node processes
taskkill /IM node.exe /F

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm ci
```
