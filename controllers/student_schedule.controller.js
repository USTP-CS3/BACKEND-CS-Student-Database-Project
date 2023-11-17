import service from '../services/student_schedule.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const student_schedules = await service.getAllStudentSchedules();

 res.send(student_schedules);
});

router.get('/:id', async (req, res) => {
 const student_schedules = await service.getStudentScheduleById(req.params.id);

 if (student_schedules == undefined) {
  res.status(404).json({ error: 'Student Schedule not found' });
 } else {
  res.send(student_schedules);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteStudentSchedule(req.params.id);

 if (affectedRows == 0) {
  res
   .status(404)
   .json('No Student Schedule Found with the given ID ' + req.params.id);
 } else {
  res.send('Student Schedule Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditStudentSchedule(req.body);
 res.status(201).send('Student Schedule Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditStudentSchedule(
  req.body,
  req.params.id
 );
 if (affectedRows == 0) {
  res
   .status(404)
   .json('No Student Schedule Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
