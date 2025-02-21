const { pool, sql } = require('../config/db');

class PressRelease {
  static async create(title, content, videoCallId) {
    try {
      const result = await pool.request()
        .input('title', sql.NVarChar(255), title)
        .input('content', sql.NVarChar(sql.MAX), content)
        .input('videoCallId', sql.NVarChar(100), videoCallId)
        .query(`
          INSERT INTO PressReleases (title, content, videoCallId, createdAt)
          OUTPUT INSERTED.*
          VALUES (@title, @content, @videoCallId, GETDATE())
        `);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  static async getRecent(limit = 5) {
    try {
      const result = await pool.request()
        .input('limit', sql.Int, limit)
        .query(`
          SELECT TOP (@limit) *
          FROM PressReleases
          ORDER BY createdAt DESC
        `);
      return result.recordset;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = PressRelease;
