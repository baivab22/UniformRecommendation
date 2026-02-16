import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college_id: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
}, { timestamps: true });

export default mongoose.model('Batch', batchSchema);
