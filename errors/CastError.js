const CAST_ERROR_CODE = require('../utils/constants');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.message = message;
    this.statusCode = CAST_ERROR_CODE;
  }
}

module.exports = CastError;
