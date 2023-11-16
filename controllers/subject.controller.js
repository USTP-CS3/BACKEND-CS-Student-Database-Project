import service from '../services/subject.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const subjects = await service.getAllSubjects();

 res.send(subjects);
});

router.get('/:id', async (req, res) => {
 const subjects = await service.getSubjectById(req.params.id);

 if (subjects == undefined) {
  res.status(404).json({ error: 'Subject not found' });
 } else {
  res.send(subjects);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteSubject(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Subject Found with the given ID ' + req.params.id);
 } else {
  res.send('Subject Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditSubject(req.body, req.body.course_code);
 res.status(201).send('Subject Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditSubject(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Subject Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
