// utils/apiResponse.js

/**
 * Sends a standardized success response.
 * @param {Object} res - Express response object.
 * @param {Object} data - Data to send in the response.
 * @param {string} message - Optional success message.
 * @param {number} status - HTTP status code (default is 200).
 */
const successResponse = (res, data, message = 'Success', status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Sends a standardized error response.
   * @param {Object} res - Express response object.
   * @param {string} error - Error details.
   * @param {string} message - Optional error message.
   * @param {number} status - HTTP status code (default is 500).
   */
  const errorResponse = (res, error, message = 'Error', status = 500) => {
    return res.status(status).json({
      success: false,
      message,
      error,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  