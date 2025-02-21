// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  static async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      if (await User.findByEmail(email)) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create(username, email, hashedPassword);

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      console.log('Password:', password);
      console.log('User Password Hash:', user.password_hash);
  
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  static logout(req, res) {
    res.clearCookie('jwt');
    res.redirect('/login');
  }
}

module.exports = AuthController;
