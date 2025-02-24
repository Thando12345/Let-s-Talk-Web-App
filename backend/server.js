require('dotenv').config();
const express = require('express');
const { randomBytes } = require('crypto');
const path = require('path');
const app = express();

// Auto-generate JWT_SECRET if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = randomBytes(32).toString('hex');
  console.log('JWT_SECRET auto-generated:', process.env.JWT_SECRET);
}

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // static folder for HTML

// Mount API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/service-issues', require('./routes/serviceIssues'));
app.use('/api/press-releases', require('./routes/pressReleases'));
app.use('/api/government-services', require('./routes/govServices'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Serve login.html from public folder
});

// Serve the signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Serve signup.html from public folder
});

// Root route handler
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Let's Talk Web App API</h1>
    <h2>Available API Routes:</h2>
    <ul>
      <li><a href="/api/auth">/api/auth</a> - Authentication endpoints</li>
      <li><a href="/api/service-issues">/api/service-issues</a> - Service Issues endpoints</li>
      <li><a href="/api/press-releases">/api/press-releases</a> - Press Releases endpoints</li>
      <li><a href="/api/government-services">/api/government-services</a> - Government Services endpoints</li>
      <li><a href="/api/dashboard">/api/dashboard</a> - Dashboard endpoints</li>
    </ul>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
