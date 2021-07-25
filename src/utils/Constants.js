// allowed app response codes
export const RESPONSE_CODES = {
    SUCCESS: '00',
    NOT_FOUND: '02',
    FAILED: '01',
    UNKNOWN_ERROR: '03'
  };

// response status codes
export const STATUS_CODES = {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    BAD_REQUEST: 400,
};

// different error exception names
export const ERROR_NAMES = {
    ValidationError: 'ValidationError',
    NotFoundError: 'NotFoundError',
    ServerError: 'ServerError',
};

// response messages
export const RESPONSE_MESSAGE = {
    WELCOME: 'Welcome to Clinic API',
    INVALID_JSON: 'Invalid Json',
    SERVER_ERROR: 'Something Went Wrong, Please try again later',
    NOT_FOUND: 'Route does not exist',
}