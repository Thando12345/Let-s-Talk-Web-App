// routes/dashboard.js

const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/auth');

/**
 * GET /api/dashboard
 * Retrieves aggregated dashboard data including recent service issues, press releases, and government services.
 */
router.get('/', authMiddleware, DashboardController.getDashboardData);

module.exports = router;
