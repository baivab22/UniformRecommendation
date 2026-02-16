import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  student_id: { type: String, required: true },
  mobile: { type: String, required: true },
  college: { type: String, required: true },
  batch: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  clothing_type: { type: String, enum: ['shirt', 'pant', 'shoes'] },
  age: Number,
  height: Number,
  weight: Number,
  morphology: String,
  fit_preference: String,
  collar_size: String,
  chest: Number,
  waist: Number,
  hip: Number,
  shoulder: Number,
  inseam: Number,
  shoe_size: Number,
  is_dispatched: { type: Boolean, default: false },
  dispatched_at: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
