const { pool, sql } = require('../config/db');

class GovService {
  static async getAll() {
    try {
      const result = await pool.request()
        .query(`
          SELECT * FROM GovServices
          ORDER BY updatedAt DESC
        `);
      return result.recordset;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  static async getByType(serviceType) {
    try {
      const result = await pool.request()
        .input('serviceType', sql.NVarChar(50), serviceType)
        .query(`
          SELECT * FROM GovServices
          WHERE serviceType = @serviceType
          ORDER BY updatedAt DESC
        `);
      return result.recordset;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = GovService;
