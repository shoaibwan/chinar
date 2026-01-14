const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const mainRoutes = require('./routes/main');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', mainRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server with IPv4 fallback
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Chinar Charity Foundation website is live!`);
});

// Handle IPv6 errors by falling back to IPv4
server.on('error', (err) => {
  if (err.code === 'EADDRNOTAVAIL' || err.code === 'EAFNOSUPPORT') {
    console.log('IPv6 not available, trying IPv4...');
    const server4 = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on http://0.0.0.0:${PORT} (IPv4)`);
      console.log(`Chinar Charity Foundation website is live!`);
    });
    
    server4.on('error', (err4) => {
      console.error('Failed to start server:', err4);
      process.exit(1);
    });
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
