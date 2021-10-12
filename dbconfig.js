
const Pool = require('pg').Pool;

const pool = new Pool({
  host     : 'localhost',
  user     : 'postgres',
  password : '12345',
  database : 'api_test',
  port: '5432'
});

module.exports = pool;