const express = require('express');
const router = express.Router();
const PressReleaseController = require('../controllers/pressReleaseController');
const authMiddleware = require('../middlewares/auth');

/**
 * POST /api/press-releases
 * Creates a new press release.
 * Expects { title, content, videoCallId } in the request body.
 * Protected endpoint: requires a valid JWT.
 */
router.post('/', authMiddleware, PressReleaseController.createPressRelease);

/**
 * GET /api/press-releases
 * Retrieves the 5 most recent press releases.
 * Protected endpoint: requires a valid JWT.
 */
router.get('/', authMiddleware, PressReleaseController.getRecentPressReleases);

module.exports = router;
