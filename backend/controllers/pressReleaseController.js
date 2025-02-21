const { pool, sql } = require('../config/db');

class PressReleaseController {
  // Create a new press release
  static async createPressRelease(req, res) {
    try {
      const { title, content, videoCallId } = req.body;
      
      const result = await pool.request()
        .input('title', sql.NVarChar(255), title)
        .input('content', sql.NVarChar(sql.MAX), content)
        .input('videoCallId', sql.NVarChar(100), videoCallId)
        .query(`
          INSERT INTO PressReleases (title, content, videoCallId)
          OUTPUT INSERTED.*
          VALUES (@title, @content, @videoCallId)
        `);

      res.status(201).json(result.recordset[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Retrieve the 5 most recent press releases
  static async getRecentPressReleases(req, res) {
    try {
      const result = await pool.request()
        .query(`
          SELECT TOP 5 * 
          FROM PressReleases 
          ORDER BY createdAt DESC
        `);
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PressReleaseController;
