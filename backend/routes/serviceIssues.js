const express = require('express');
const router = express.Router();
const ServiceIssueController = require('../controllers/serviceIssueController');
const authMiddleware = require('../middlewares/auth.js');


/**
 * POST /api/service-issues
 * Creates a new service issue.
 * Expects { geolocation, description } in the request body.
 * Protected endpoint: requires a valid JWT.
 */
router.post('/', authMiddleware, ServiceIssueController.createIssue);

/**
 * GET /api/service-issues
 * Retrieves a list of all service issues.
 * Protected endpoint: requires a valid JWT.
 */
router.get('/', authMiddleware, ServiceIssueController.getAllIssues);

module.exports = router;
