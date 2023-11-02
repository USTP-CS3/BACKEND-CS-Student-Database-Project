const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('express-async-errors');

const db = require('./db');

const studentRoutes = require('./controllers/student.controller');

// Middleware
app.use(bodyParser.json());
app.use('/api/students', studentRoutes);
app.use((err, req, res, next) => {
 console.log(err);
 res.status(err.status).send('Something went wrong!');
});

// Test db connection
db
 .query('SELECT 1')
 .then((data) => {
  console.log('db connection successful');
  app.listen(3000, () => console.log('Server listening on port 3000!'));
 })
 .catch((err) => console.log('db connection failed', err));
