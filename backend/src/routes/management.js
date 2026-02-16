import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from '../middleware/auth.js';
import School from '../models/School.js';
import College from '../models/College.js';
import Batch from '../models/Batch.js';

const router = express.Router();

// Schools
router.get('/schools', async (_req, res) => {
  const items = await School.find().sort({ createdAt: 1 });
  res.json(items.map(({ _id, name, createdAt }) => ({ id: _id, name, created_at: createdAt })));
});
router.post('/schools', authMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const item = await School.create({ name });
  res.status(201).json({ id: item._id, name: item.name, created_at: item.createdAt });
});
router.put('/schools/:id', authMiddleware, async (req, res) => {
  const { name } = req.body;
  await School.findByIdAndUpdate(req.params.id, { name });
  res.json({ message: 'Updated' });
});
router.delete('/schools/:id', authMiddleware, async (req, res) => {
  await School.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Colleges
router.get('/colleges', async (_req, res) => {
  const items = await College.find().sort({ createdAt: 1 });
  res.json(items.map(({ _id, name, logo_url, campuses, createdAt }) => ({ 
    id: _id, 
    name,
    logo_url,
    campuses: (campuses || []).map(c => ({ id: c._id, name: c.name, city: c.city, logo_url: c.logo_url, address: c.address })),
    created_at: createdAt 
  })));
});
router.post('/colleges', authMiddleware, async (req, res) => {
  const { name, logo_url } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const item = await College.create({ name, logo_url, campuses: [] });
  res.status(201).json({ 
    id: item._id, 
    name: item.name, 
    logo_url: item.logo_url,
    campuses: [],
    created_at: item.createdAt 
  });
});
router.put('/colleges/:id', authMiddleware, async (req, res) => {
  const { name, logo_url } = req.body;
  await College.findByIdAndUpdate(req.params.id, { name, logo_url });
  res.json({ message: 'Updated' });
});
router.delete('/colleges/:id', authMiddleware, async (req, res) => {
  await College.findByIdAndDelete(req.params.id);
  // cascade batches manually
  await Batch.deleteMany({ college_id: req.params.id });
  res.json({ message: 'Deleted' });
});

// Campuses
router.post('/colleges/:collegeId/campuses', authMiddleware, async (req, res) => {
  const { name, city, logo_url, address } = req.body;
  if (!name || !city) return res.status(400).json({ message: 'Name and city required' });
  
  const college = await College.findByIdAndUpdate(
    req.params.collegeId,
    { 
      $push: { 
        campuses: { 
          _id: new mongoose.Types.ObjectId(),
          name,
          city,
          logo_url,
          address: address || ''
        } 
      } 
    },
    { new: true }
  );
  
  const newCampus = college.campuses[college.campuses.length - 1];
  res.status(201).json({ 
    id: newCampus._id,
    name: newCampus.name,
    city: newCampus.city,
    logo_url: newCampus.logo_url,
    address: newCampus.address
  });
});

router.put('/colleges/:collegeId/campuses/:campusId', authMiddleware, async (req, res) => {
  const { name, city, logo_url, address } = req.body;
  
  await College.findByIdAndUpdate(
    req.params.collegeId,
    { 
      $set: { 
        'campuses.$[elem].name': name,
        'campuses.$[elem].city': city,
        'campuses.$[elem].logo_url': logo_url,
        'campuses.$[elem].address': address
      }
    },
    { 
      arrayFilters: [{ 'elem._id': req.params.campusId }],
      new: true
    }
  );
  
  res.json({ message: 'Campus updated' });
});

router.delete('/colleges/:collegeId/campuses/:campusId', authMiddleware, async (req, res) => {
  await College.findByIdAndUpdate(
    req.params.collegeId,
    { 
      $pull: { 
        campuses: { _id: req.params.campusId }
      }
    }
  );
  
  res.json({ message: 'Campus deleted' });
});

// Batches
router.get('/batches', async (_req, res) => {
  const items = await Batch.find().sort({ createdAt: 1 });
  res.json(items.map(({ _id, name, college_id, createdAt }) => ({ id: _id, name, college_id: String(college_id), created_at: createdAt })));
});
router.post('/batches', authMiddleware, async (req, res) => {
  const { name, college_id } = req.body;
  if (!name || !college_id) return res.status(400).json({ message: 'Name and college_id required' });
  const item = await Batch.create({ name, college_id });
  res.status(201).json({ id: item._id, name: item.name, college_id: String(item.college_id), created_at: item.createdAt });
});
router.put('/batches/:id', authMiddleware, async (req, res) => {
  const { name, college_id } = req.body;
  await Batch.findByIdAndUpdate(req.params.id, { name, college_id });
  res.json({ message: 'Updated' });
});
router.delete('/batches/:id', authMiddleware, async (req, res) => {
  await Batch.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
