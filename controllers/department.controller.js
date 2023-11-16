import service from '../services/department.service.js';
import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
 const departments = await service.getAllDepartments();

 res.send(departments);
});

router.get('/:id', async (req, res) => {
 const departments = await service.getDepartmentById(req.params.id);

 if (departments == undefined) {
  res.status(404).json({ error: 'Department not found' });
 } else {
  res.send(departments);
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditDepartment(req.body);
 res.status(201).send('Department Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditDepartment(
  req.body,
  req.params.id
 );
 if (affectedRows == 0) {
  res
   .status(404)
   .json('No Department Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
