import express from 'express';
import db from '../db.js';
import service from '../services/faculty.service.js';

// http://127.0.0.1:3000/api/faculty/
const router = express.Router();

router.get('/', async (req, res) => {
 const faculties = await service.getAllFaculties();

 res.send(faculties);
});

router.get('/:id', async (req, res) => {
 const faculties = await service.getFacultyById(req.params.id);

 if (faculties == undefined) {
  res.status(404).json({ error: 'Faculty not found' });
 } else {
  res.send(faculties);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteFaculty(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Faculty Found with the given ID ' + req.params.id);
 } else {
  res.send('Faculty Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditFaculty(req.body, req.body.id);
 res.status(201).send('Faculty Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditFaculty(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Faculty Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

// module.exports = router;
export default router;
