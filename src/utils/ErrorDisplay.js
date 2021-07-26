import {
  RESPONSE_MESSAGE,
  ERROR_NAMES
} from 'utils/Constants';
import ServerResponse from 'utils/ServerResponses';

/**
 * @description display different errors base on exception names
 * @param {object} res - response body
 * @param {object} error - the error object
 * @returns {Error} - object representing response response
 */
const ErrorDisplay = (res, error) => {
  let errorToDisplay;
  const {
    name, message, statusCode
  } = error;

  switch (name) {
    // case where validation error
    case ERROR_NAMES.ValidationError:
      errorToDisplay = ServerResponse.badRequest(res, message);
      break;

    // case where the application throws a syntax error
    case ERROR_NAMES.SyntaxError:
      // handle invalid json
      errorToDisplay = ServerResponse.badRequest(res, RESPONSE_MESSAGE.INVALID_JSON);
      break;

    // case where the application does not find the route
    case ERROR_NAMES.NotFoundError:
      // handle route not found
      errorToDisplay = ServerResponse.notFound(res, message);
      break;
      
    // case where the error is not part of the server identified error
    // most likely 500 errors
    default:
      errorToDisplay = ServerResponse.serverError(res, RESPONSE_MESSAGE.SERVER_ERROR);
  }

  // log the error information
  ServerResponse.logData(res, message, null, statusCode,
    'error');
    
    // send the error to the user
  return errorToDisplay;
};

export default ErrorDisplay;
