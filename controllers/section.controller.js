import service from '../services/section.service.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
 const sections = await service.getAllSections();

 res.send(sections);
});

router.get('/:id', async (req, res) => {
 const sections = await service.getSectionById(req.params.id);

 if (sections == undefined) {
  res.status(404).json({ error: 'Section not found' });
 } else {
  res.send(sections);
 }
});

router.delete('/:id', async (req, res) => {
 const affectedRows = await service.deleteSection(req.params.id);

 if (affectedRows == 0) {
  res.status(404).json('No Section Found with the given ID ' + req.params.id);
 } else {
  res.send('Section Record Deleted Successfully');
 }
});

router.post('/', async (req, res) => {
 await service.addOrEditSection(req.body, req.body.id);
 res.status(201).send('Section Record Added Successfully');
});

router.put('/:id', async (req, res) => {
 const affectedRows = await service.addOrEditSection(req.body, req.params.id);
 if (affectedRows == 0) {
  res.status(404).json('No Section Found with the given ID ' + req.params.id);
 } else {
  res.send('Updated Successfully');
 }
});

export default router;
