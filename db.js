const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
 host: '127.0.0.1',
 user: 'root',
 password: 'root',
 database: 'csstudentdb',
 waitForConnections: true,
 connectionLimit: 10,
 queueLimit: 0,
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

// Export the pool and executeQuery function
module.exports = mysqlPool;
module.exports.executeQuery = executeQuery;
