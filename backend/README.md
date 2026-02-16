# Fit Form Fashion - Backend

Express.js backend for Fit Form Fashion application with MongoDB integration.

## Features

- **MongoDB Integration** - Document-based data storage for schools, colleges, batches, students, and admins
- **JWT Authentication** - Secure admin login with token-based auth
- **RESTful API** - Clean API endpoints for all CRUD operations
- **CORS Enabled** - Frontend integration support

## Prerequisites

- **Node.js** 18+
- **MongoDB** (local or Atlas connection string)

## Installation

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/fitform
JWT_SECRET=supersecretjwt
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin123
PORT=4000
```

## Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:4000` by default.

## Setting Up MongoDB

### Option 1: Local MongoDB
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Verify connection
mongosh
```

### Option 2: MongoDB Atlas (Cloud)
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a project and cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login (returns JWT token)

### Management (Protected)
- `GET /api/schools` - List all schools
- `POST /api/schools` - Create school (requires auth)
- `PUT /api/schools/:id` - Update school (requires auth)
- `DELETE /api/schools/:id` - Delete school (requires auth)

- `GET /api/colleges` - List all colleges
- `POST /api/colleges` - Create college (requires auth)
- `PUT /api/colleges/:id` - Update college (requires auth)
- `DELETE /api/colleges/:id` - Delete college (requires auth)

- `GET /api/batches` - List all batches
- `POST /api/batches` - Create batch (requires auth)
- `PUT /api/batches/:id` - Update batch (requires auth)
- `DELETE /api/batches/:id` - Delete batch (requires auth)

### Students
- `POST /api/students` - Submit student form (public)
- `GET /api/students` - List all students (public for now)

## Example Requests

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}'
```

### Create College (requires token)
```bash
curl -X POST http://localhost:4000/api/colleges \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"State University"}'
```

### Submit Student Form
```bash
curl -X POST http://localhost:4000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "mobile":"+919876543210",
    "college":"State University",
    "batch":"2024",
    "gender":"male",
    "clothing_type":"shirt",
    "chest":40,
    "waist":32
  }'
```

## Database Schema

### Admin
- email (unique)
- passwordHash

### School
- name

### College
- name

### Batch
- name
- college_id (references College)

### Student
- name, email, mobile
- college, batch
- gender, clothing_type
- measurements (age, height, weight, morphology, fit_preference)
- sizing data (collar_size, chest, waist, hip, shoulder, inseam, shoe_size)
- createdAt, updatedAt

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | Required | MongoDB connection string |
| `JWT_SECRET` | Required | Secret key for JWT signing |
| `ADMIN_EMAIL` | admin@admin.com | Default admin email |
| `ADMIN_PASSWORD` | admin123 | Default admin password |
| `PORT` | 4000 | Server port |

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `brew services list`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

**Port Already in Use:**
```bash
lsof -i :4000
kill -9 <PID>
```

**CORS Issues:**
- CORS is already enabled for all origins
- Check frontend API URL matches backend URL

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Morgan** - HTTP logging
- **CORS** - Cross-origin support

## License

MIT
