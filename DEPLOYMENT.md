# Deployment Guide

## Local Development

See QUICKSTART.md for local setup instructions.

## Production Deployment

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-demo
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

#### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-domain.com
```

### Backend Deployment (Node.js)

#### Option 1: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main
```

#### Option 2: DigitalOcean/AWS/Azure
1. Set up a Node.js server
2. Install dependencies: `npm install --production`
3. Set environment variables
4. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start backend/server.js --name ecommerce-api
pm2 startup
pm2 save
```

### Frontend Deployment (React)

#### Option 1: Netlify
1. Build the app: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Or connect your Git repository for automatic deployments

#### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

#### Option 3: Static Hosting (AWS S3, GitHub Pages)
```bash
npm run build
# Upload the build folder to your hosting service
```

### Database Setup

#### MongoDB Atlas (Recommended for Production)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (or allow from anywhere for testing)
5. Get connection string
6. Update MONGO_URI in backend .env

### Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS for all connections
- [ ] Enable CORS only for your frontend domain
- [ ] Set secure cookie flags if using cookies
- [ ] Add rate limiting to prevent abuse
- [ ] Validate and sanitize all inputs
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB authentication
- [ ] Keep dependencies updated
- [ ] Add logging and monitoring

### CORS Configuration for Production

Update `backend/server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### Performance Optimization

1. Enable gzip compression
2. Add caching headers
3. Use CDN for static assets
4. Optimize database queries with indexes
5. Implement pagination for large datasets

### Monitoring

Consider adding:
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring (UptimeRobot)
- Log aggregation (Loggly, Papertrail)

### Backup Strategy

1. Enable automated MongoDB backups
2. Regular database exports
3. Version control for code
4. Document recovery procedures
