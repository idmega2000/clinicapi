
  import { RESPONSE_CODES, RESPONSE_MESSAGE } from './Constants';
import logger from './logger';

  /**
  * @description class will implement functionalities for all server responses
  *
  * @class ServerResponses
  */
  class ServerResponses {
    /**
       * @description - for success ok
       * @param {object} res the response object
       * @param {string} responseMessage The message to the client
       * @param {object} data the data to from the activity
       * @param {Number} statusCode the status code to be sent to user
       * @param {String} status the status of the event
       * @returns {object} returns response object with the necessary info
       */
    static successOk(res, responseMessage, data = {},
      statusCode = 200,
      status = 'success') {
      ServerResponses.logData(res, responseMessage, data, statusCode,
        status);
      return res.status(statusCode)
        .json({
          responseMessage,
          status,
          data,
          responseCode: RESPONSE_CODES.SUCCESS,
        });
    }

    /**
         * @description - for bad request
         * @param {object} res the response object
         * @param {string} responseMessage The message to the client
         * @param {object} data the data to from the activity
         * @param {Number} statusCode the status code to be sent to user
         * @param {String} status the status of the event,
         * @returns {object} returns response object with the necessary info
         */
    static badRequest(res, responseMessage, data = null, statusCode = 400,
      status = 'error') {
      return res.status(statusCode).json({
        data,
        status,
        responseMessage,
        responseCode: RESPONSE_CODES.FAILED
      });
    }


    /**
     * @description - for not found
     * @param {object} res the response object
     * @param {string} responseMessage The message to the client
     * @param {object} data the data to from the activity
     * @param {Number} statusCode the status code to be sent to user
     * @param {String} status the status of the event
     * @returns {object} returns response object with the necessary info
     */
    static notFound(res, responseMessage, data = null, statusCode = 404,
      status = 'error') {
      return res.status(statusCode).json({
        responseMessage,
        data,
        status,
        responseCode: RESPONSE_CODES.NOT_FOUND,
      });
    }

    /**
     * @description - for internal server error
     * @param {object} res the response object
     * @param {string} responseMessage The message to the client
     * @param {object} data the data to from the activity
     * @param {Number} statusCode the status code to be sent to user
     * @param {String} status the status of the event
     * @returns {object} returns response object with the necessary info
     */
    static serverError(res, responseMessage = RESPONSE_MESSAGE.SERVER_ERROR,
      data = null, statusCode = 500,
      status = 'error') {
      return res.status(500).json({
        responseMessage,
        status,
        data,
        responseCode: RESPONSE_CODES.UNKNOWN_ERROR
      });
    }


    /**
     * @description - for formating response
     * @param {object} res the response object
     * @param {string} responseMessage The message to the client
     * @param {object} data the data to from the activity
     * @param {Number} statusCode the status code to be sent to user
     * @param {String} status the status of the event
     * @param {boolean} logResponse bool to log the response or not
     * @returns {object} returns response object with the necessary info
     */
    static logData(res, responseMessage, data = {}, statusCode = 400,
      status = 'error', logResponse = true) {
      const { req } = res;

      logger.log({
        level: status === 'error' ? 'error' : 'info',
        method: req.method,
        url: req.url,
        clientInfo: req.headers['user-agent'],
        responseMessage,
        statusCode,
      });
    }
  }

  export default ServerResponses;
