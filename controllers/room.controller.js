import service from '../services/room.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const rooms = await service.getAllRooms();

 res.send(rooms);
});

router.get('/:id', async (req, res) => {
 const rooms = await service.getRoomById(req.params.id);

 if (rooms == undefined) {
  res.status(404).json({ error: 'Room not found' });
 } else {
  res.send(rooms);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteRoom(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Room Found with the given ID ' + req.params.id);
 } else {
  res.send('Room Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditRoom(req.body, req.body.id);
 res.status(201).send('Room Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditRoom(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Room Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
