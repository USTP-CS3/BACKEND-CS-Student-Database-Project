import service from '../services/semester.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const semesters = await service.getAllSemesters();

 res.send(semesters);
});

router.get('/:id', async (req, res) => {
 const semesters = await service.getSemesterById(req.params.id);

 if (semesters == undefined) {
  res.status(404).json({ error: 'Semester not found' });
 } else {
  res.send(semesters);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteSemester(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Semester Found with the given ID ' + req.params.id);
 } else {
  res.send('Semester Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditSemester(req.body);
 res.status(201).send('Semester Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditSemester(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Semester Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
