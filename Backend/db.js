
// this is data base confi
const pg = require('pg');
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'menu',
  password: '2003',
  port: 5432, // default PostgreSQL port
});
module.exports = pool;