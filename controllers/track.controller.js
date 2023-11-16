import service from '../services/track.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const tracks = await service.getAllTracks();

 res.send(tracks);
});

router.get('/:id', async (req, res) => {
 const tracks = await service.getTrackById(req.params.id);

 if (tracks == undefined) {
  res.status(404).json({ error: 'Track not found' });
 } else {
  res.send(tracks);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteTrack(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Track Found with the given ID ' + req.params.id);
 } else {
  res.send('Track Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditTrack(req.body);
 res.status(201).send('Track Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditTrack(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Track Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
