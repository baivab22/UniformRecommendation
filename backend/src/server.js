import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import Admin from './models/Admin.js';
import authRoutes from './routes/auth.js';
import managementRoutes from './routes/management.js';
import studentRoutes from './routes/students.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api', managementRoutes);
app.use('/api/students', studentRoutes);

async function bootstrap() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');

  // Seed default admin if not exists
  const email = process.env.ADMIN_EMAIL || 'admin@admin.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash: hash });
    console.log('Seeded admin account:', email);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
