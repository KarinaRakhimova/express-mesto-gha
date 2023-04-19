const NOTFOUND_ERROR_CODE = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message;
    this.statusCode = NOTFOUND_ERROR_CODE;
  }
}

module.exports = NotFoundError;
