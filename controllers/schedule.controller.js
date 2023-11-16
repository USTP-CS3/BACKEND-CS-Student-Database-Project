import express from 'express';
import db from '../db.js';
import service from '../services/schedule.service.js';

const router = express.Router();

// http://127.0.0.1:3000/api/schedule/
router.get('/', async (req, res) => {
 const schedules = await service.getAllSchedules();

 res.send(schedules);
});

router.get('/:id', async (req, res) => {
 const schedules = await service.getScheduleById(req.params.id);

 if (schedules == undefined) {
  res.status(404).json({ error: 'Schedule not found' });
 } else {
  res.send(schedules);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteSchedule(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Schedule Found with the given ID ' + req.params.id);
 } else {
  res.send('Schedule Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditSchedule(req.body);
 res.status(201).send('Schedule Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditSchedule(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Schedule Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
