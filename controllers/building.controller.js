import service from '../services/building.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const buildings = await service.getAllBuildings();

 res.send(buildings);
});

router.get('/:id', async (req, res) => {
 const buildings = await service.getBuildingById(req.params.id);

 if (buildings == undefined) {
  res.status(404).json({ error: 'Building not found' });
 } else {
  res.send(buildings);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteBuilding(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Building Found with the given ID ' + req.params.id);
 } else {
  res.send('Building Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditBuilding(req.body, req.body.id);
 res.status(201).send('Building Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditBuilding(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Building Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
