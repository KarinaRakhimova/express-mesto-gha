const cors = require('cors');

const allowedCors = [
  'https://mesto2023.nomoredomains.monster',
  'https://api.mesto2023.students.nomoredomains.monster',
  'https://51.250.64.58',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsOptions = {
  origin: allowedCors,
  methods: DEFAULT_ALLOWED_METHODS,
  credentials: true,
};

module.exports = { cors, corsOptions };
