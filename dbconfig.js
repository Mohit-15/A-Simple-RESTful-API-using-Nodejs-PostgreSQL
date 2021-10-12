
const Pool = require('pg').Pool;

const pool = new Pool({
  host     : 'localhost',
  user     : 'abc',
  password : 'abc123',
  database : 'testing',
  port: '5432'
});

module.exports = pool;
