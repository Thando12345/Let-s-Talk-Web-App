// controllers/dashboardController.js

const { pool } = require('../config/db');
const apiResponse = require('../utils/apiResponse');

class DashboardController {
  static async getDashboardData(req, res) {
    try {
      // Retrieve the 5 most recent service issues
      const serviceIssuesQuery = `
        SELECT TOP 5 *
        FROM ServiceIssues
        ORDER BY createdAt DESC
      `;
      const serviceIssuesResult = await pool.request().query(serviceIssuesQuery);

      // Retrieve the 5 most recent press releases
      const pressReleasesQuery = `
        SELECT TOP 5 *
        FROM PressReleases
        ORDER BY createdAt DESC
      `;
      const pressReleasesResult = await pool.request().query(pressReleasesQuery);

      // Retrieve all government services statuses
      const govServicesQuery = `
        SELECT *
        FROM GovServices
        ORDER BY updatedAt DESC
      `;
      const govServicesResult = await pool.request().query(govServicesQuery);

      // Combine the results into a single data object
      const data = {
        serviceIssues: serviceIssuesResult.recordset,
        pressReleases: pressReleasesResult.recordset,
        govServices: govServicesResult.recordset,
      };

      return apiResponse.successResponse(res, data, 'Dashboard data retrieved successfully');
    } catch (error) {
      return apiResponse.errorResponse(res, error.message, 'Failed to retrieve dashboard data');
    }
  }
}

module.exports = DashboardController;
