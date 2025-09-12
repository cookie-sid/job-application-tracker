/**
 * Main Router
 * Combines all route modules
 */

const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
// const applicationRoutes = require('./applications'); // Will create this next

// Health check route (already in app.js but kept here for reference)
router.get('/status', (req, res) => {
  res.json({
    message: 'Job Application Tracker API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      applications: '/api/applications',
      health: '/api/health'
    }
  });
});

// Use route modules
router.use('/auth', authRoutes);
// router.use('/applications', applicationRoutes);

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;