import mongoose from 'mongoose';

const campusSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  city: { type: String, required: true },
  logo_url: { type: String },
  address: { type: String },
}, { _id: true });

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo_url: { type: String },
  campuses: [campusSchema],
}, { timestamps: true });

export default mongoose.model('College', collegeSchema);
