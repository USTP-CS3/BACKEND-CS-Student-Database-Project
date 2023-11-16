// const express = require('express');
// const bodyParser = require('body-parser');
// require('express-async-errors');

// const db = require('./db');

// const studentRoutes = require('./controllers/student.controller');

import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import studentRoutes from './controllers/student.controller.js';
import facultyRoutes from './controllers/faculty.controller.js';
import scheduleRoutes from './controllers/schedule.controller.js';
import departmentRoutes from './controllers/department.controller.js';
import sectionRoutes from './controllers/section.controller.js';
import 'express-async-errors';

const app = express();

// Middleware
app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/sections', sectionRoutes);
app.use((err, req, res, next) => {
 console.log(err);
 res.status(err.status).send('Something went wrong!');
});

// Test db connection
const port = process.env.PORT || 3000;
db
 .query('SELECT 1')
 .then((data) => {
  console.log('db connection successful');
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
 })
 .catch((err) => console.log('db connection failed', err));
