const express = require('express');
const router = express.Router();
const GovServiceController = require('../controllers/govServiceController');
const authMiddleware = require('../middlewares/auth');

/**
 * GET /api/government-services
 * Retrieves government service statuses.
 * Optionally accepts a query parameter (e.g., ?type=water) to filter by service type.
 * Protected endpoint: requires a valid JWT.
 */
router.get('/', authMiddleware, GovServiceController.getServices);

module.exports = router;
