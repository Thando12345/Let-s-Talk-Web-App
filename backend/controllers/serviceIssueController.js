const { pool, sql } = require('../config/db');

class ServiceIssueController {
  // Create a new service issue
  static async createIssue(req, res) {
    try {
      const { geolocation, description } = req.body;
      const userId = req.user?.id; // Assume authentication middleware sets req.user

      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('geolocation', sql.NVarChar(255), geolocation)
        .input('description', sql.NVarChar(500), description)
        .query(`
          INSERT INTO ServiceIssues (userId, geolocation, description, status)
          OUTPUT INSERTED.*
          VALUES (@userId, @geolocation, @description, 'reported')
        `);

      res.status(201).json(result.recordset[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Retrieve all service issues with user info
  static async getAllIssues(req, res) {
    try {
      const result = await pool.request()
        .query(`
          SELECT si.*, u.username 
          FROM ServiceIssues si
          LEFT JOIN Users u ON si.userId = u.id
          ORDER BY createdAt DESC
        `);
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServiceIssueController;
