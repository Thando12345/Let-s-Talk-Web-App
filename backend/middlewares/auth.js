// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.jwt;

  if (!token) return res.status(401).redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');

    req.user = user;
    res.locals.user = user; // Make user available to templates
    next();
  } catch (error) {
    res.clearCookie('jwt');
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;
