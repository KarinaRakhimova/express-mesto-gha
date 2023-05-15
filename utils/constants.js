const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOTFOUND_ERROR_CODE = 404;
const DUPLICATE_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;
const URL_PATTERN = /https?:\/\/[w{3}\.]?[\w\W]*\.[a-z\W]{2,3}#?/;
const allowedCors = ['https://mesto2023.nomoredomains.monster', 'http://mesto2023.nomoredomains.monster'];

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  DUPLICATE_ERROR_CODE,
  URL_PATTERN,
  allowedCors,
};
