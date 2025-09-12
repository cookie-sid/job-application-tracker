/**
 * Authentication Routes
 * Handles user authentication endpoints
 */

const express = require('express');
const router = express.Router();

// Import controllers and middleware
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/authController');

const authenticate = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange
} = require('../middleware/validation');

// Public routes (no authentication required)
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes (authentication required)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);
router.put('/change-password', authenticate, validatePasswordChange, changePassword);

// Test route for checking if auth is working
router.get('/test', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Authentication is working!',
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.first_name
    }
  });
});

module.exports = router;