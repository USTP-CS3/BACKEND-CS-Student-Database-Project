// const mysql = require('mysql2/promise');
// require('dotenv').config();

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const mysqlPool = mysql.createPool({
 host: process.env.MYSQL_HOST,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASSWORD,
 database: process.env.MYSQL_DATABASE,
});

async function executeQuery(sql, values) {
 const connection = await mysqlPool.getConnection();
 try {
  const [results] = await connection.query(sql, values);
  return results;
 } catch (error) {
  throw error; // This will be caught by the caller
 } finally {
  // release the connection back to the pool
  if (connection) connection.release();
 }
}

// // Export the pool and executeQuery function
// module.exports = mysqlPool;
// module.exports.executeQuery = executeQuery;

export default mysqlPool;
export { executeQuery };
