import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import Student from '../models/Student.js';

const router = express.Router();

// Public submission
router.post('/', async (req, res) => {
  try {
    const cleaned = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v !== null && v !== '' && v !== undefined));
    const student = await Student.create(cleaned);
    res.status(201).json({ id: student._id });
  } catch (e) {
    res.status(400).json({ message: 'Invalid payload' });
  }
});

// Admin listing
router.get('/', async (_req, res) => {
  const items = await Student.find().sort({ createdAt: -1 });
  res.json(items.map(s => ({
    id: s._id,
    name: s.name,
    student_id: s.student_id,
    mobile: s.mobile,
    college: s.college,
    batch: s.batch,
    gender: s.gender,
    clothing_type: s.clothing_type,
    age: s.age,
    height: s.height,
    weight: s.weight,
    morphology: s.morphology,
    fit_preference: s.fit_preference,
    collar_size: s.collar_size,
    chest: s.chest,
    waist: s.waist,
    hip: s.hip,
    shoulder: s.shoulder,
    inseam: s.inseam,
    shoe_size: s.shoe_size,
    is_dispatched: s.is_dispatched,
    dispatched_at: s.dispatched_at,
    created_at: s.createdAt,
  })));
});

// Admin delete student
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete student' });
  }
});

// Admin update dispatch status
router.patch('/:id/dispatch', authMiddleware, async (req, res) => {
  try {
    const { is_dispatched } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        is_dispatched,
        dispatched_at: is_dispatched ? new Date() : null
      },
      { new: true }
    );
    res.json({ 
      message: 'Dispatch status updated',
      is_dispatched: student.is_dispatched,
      dispatched_at: student.dispatched_at
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update dispatch status' });
  }
});

export default router;
