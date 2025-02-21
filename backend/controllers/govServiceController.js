const { pool, sql } = require('../config/db');

class GovServiceController {
  // Retrieve government services status; optionally filter by service type
  static async getServices(req, res) {
    try {
      const { type } = req.query;
      let query = `SELECT * FROM GovServices`;
      
      if (type) {
        query += ` WHERE serviceType = @serviceType`;
      }
      
      query += ` ORDER BY updatedAt DESC`;
      
      const request = pool.request();
      if (type) {
        request.input('serviceType', sql.NVarChar(50), type);
      }
      const result = await request.query(query);
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = GovServiceController;
