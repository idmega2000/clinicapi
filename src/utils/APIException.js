/**
* @description a general excetption handler
*
* @class APIException
*/
class APIException extends Error {
      /**
         * @description set the necessary information
         * @param {string} message - message to be displayed
         * @param {string} name - name
         * @param {number} statusCode - status code
         * @param {string} responseCode - responseCode
         * @param {string} status - status of the request
         * @param {object} data - data to show user
         * @returns {Error} - object representing response error
         */
  constructor(message, name = 'ValidationError', statusCode = 400,
    responseCode = null, status = 'error', data = {}) {
    super(message);
    this.name = name;
    this.status = status;
    this.data = data;
    this.message = message;
    this.dateTime = new Date();
    this.responseCode = responseCode;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, APIException);
  }
}
export default APIException;
