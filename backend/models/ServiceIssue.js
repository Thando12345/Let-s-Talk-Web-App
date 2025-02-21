const { pool, sql } = require('../config/db');

class ServiceIssue {
  static async create(userId, geolocation, description) {
    try {
      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('geolocation', sql.NVarChar(255), geolocation)
        .input('description', sql.NVarChar(500), description)
        .query(`
          INSERT INTO ServiceIssues (userId, geolocation, description, status, createdAt)
          OUTPUT INSERTED.*
          VALUES (@userId, @geolocation, @description, 'reported', GETDATE())
        `);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  static async findAll() {
    try {
      const result = await pool.request()
        .query(`
          SELECT si.*, u.username 
          FROM ServiceIssues si
          LEFT JOIN Users u ON si.userId = u.id
          ORDER BY si.createdAt DESC
        `);
      return result.recordset;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = ServiceIssue;
