const { FORBIDEN_ERR0R_CODE } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDEN_ERR0R_CODE;
  }
};
