// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// const service = require('../services/student.service');

import express from 'express';
import db from '../db.js';
import service from './services/student.service.js';

router = express.Router();

// http://127.0.0.1:3000/api/students/
router.get('/', async (req, res) => {
 const students = await service.getAllStudents();

 res.send(students);
});

router.get('/:id', async (req, res) => {
 const students = await service.getStudentById(req.params.id);

 if (students == undefined) {
  res.status(404).json({ error: 'Student not found' });
 } else {
  res.send(students);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteStudent(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Student Found with the given ID ' + req.params.id);
 } else {
  res.send('Student Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditStudent(req.body);
 res.status(201).send('Student Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditStudent(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Student Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

// module.exports = router;
export default router;
