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
    SyntaxError: 'SyntaxError'
};

// response messages
export const RESPONSE_MESSAGE = {
    WELCOME: 'welcome to clinic API',
    INVALID_JSON: 'invalid JSON',
    SERVER_ERROR: 'something Went Wrong, please try again later',
    NOT_FOUND: 'route does not exist',
    CLINIC_NOT_FOUND: 'clinic not found',
    CLINIC_FETCHED: 'clinic fetched successfull'
}

// different version urls
export const VSERSION_URL ={
    V1: '/api/v1',
}


export const CLINIC_TYPES = {
    Vet: 'Vetinary',
    Dental: 'Dental'
}