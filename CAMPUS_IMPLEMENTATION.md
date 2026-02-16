# Campus Feature - Technical Implementation Details

## Architecture Overview

```
Frontend (React/TypeScript)
    ↓
    ├── AdminManagement.tsx (Main component)
    │   ├── State: colleges, campuses, expandedColleges
    │   ├── Dialog for add/edit campus
    │   └── API calls to backend
    ↓
Backend (Node.js/Express)
    ├── College Model (MongoDB)
    │   └── Nested campuses array
    ├── Management Routes
    │   ├── GET /colleges
    │   ├── POST /colleges/:collegeId/campuses
    │   ├── PUT /colleges/:collegeId/campuses/:campusId
    │   └── DELETE /colleges/:collegeId/campuses/:campusId
    ↓
Database (MongoDB)
    └── Colleges collection with embedded campuses
```

## Detailed Code Changes

### Backend - College Model (`backend/src/models/College.js`)

**Previous Structure:**
```javascript
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });
```

**New Structure:**
```javascript
const campusSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String },
}, { _id: true });

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campuses: [campusSchema],  // Array of campus objects
}, { timestamps: true });
```

**Key Points:**
- Campuses are embedded documents (not separate collection)
- Each campus has its own ObjectId for CRUD operations
- Address is optional
- `_id: true` ensures each campus is uniquely identifiable

### Backend - Routes (`backend/src/routes/management.js`)

#### 1. **GET /api/colleges** (Updated)
```javascript
router.get('/colleges', async (_req, res) => {
  const items = await College.find().sort({ createdAt: 1 });
  res.json(items.map(({ _id, name, campuses, createdAt }) => ({ 
    id: _id, 
    name, 
    campuses: (campuses || []).map(c => ({ 
      id: c._id, 
      name: c.name, 
      city: c.city, 
      address: c.address 
    })),
    created_at: createdAt 
  })));
});
```

**Changes:**
- Now includes campuses array in response
- Maps campus _id to id for frontend
- Handles null/undefined campuses gracefully

#### 2. **POST /api/colleges/:collegeId/campuses** (New)
```javascript
router.post('/colleges/:collegeId/campuses', authMiddleware, async (req, res) => {
  const { name, city, address } = req.body;
  if (!name || !city) return res.status(400).json({ message: 'Name and city required' });
  
  const college = await College.findByIdAndUpdate(
    req.params.collegeId,
    { 
      $push: { 
        campuses: { 
          _id: new (require('mongoose')).Types.ObjectId(),
          name,
          city,
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
    address: newCampus.address
  });
});
```

**Implementation Notes:**
- Uses `$push` to add to campuses array
- Generates unique ObjectId for each campus
- Returns the newly created campus
- Requires authentication via `authMiddleware`

#### 3. **PUT /api/colleges/:collegeId/campuses/:campusId** (New)
```javascript
router.put('/colleges/:collegeId/campuses/:campusId', authMiddleware, async (req, res) => {
  const { name, city, address } = req.body;
  
  await College.findByIdAndUpdate(
    req.params.collegeId,
    { 
      $set: { 
        'campuses.$[elem].name': name,
        'campuses.$[elem].city': city,
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
```

**MongoDB Features Used:**
- `arrayFilters` - Target specific array element by _id
- `$[elem]` - Array filter placeholder
- `$set` - Update specific fields

#### 4. **DELETE /api/colleges/:collegeId/campuses/:campusId** (New)
```javascript
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
```

**MongoDB Features Used:**
- `$pull` - Remove array element matching criteria

### Frontend - State Management (AdminManagement.tsx)

#### Types
```typescript
type Campus = { id: string; name: string; city: string; address?: string };
type College = { id: string; name: string; campuses?: Campus[]; created_at?: string };

type DialogState = {
  type: "school" | "college" | "batch" | "campus" | "";
  mode: "add" | "edit";
  item?: any;
  name: string;
  city?: string;
  address?: string;
  collegeId?: string;
};
```

#### Key State Variables
```typescript
const [colleges, setColleges] = useState<College[]>([]);
const [expandedColleges, setExpandedColleges] = useState<Set<string>>(new Set());
const [dialogState, setDialogState] = useState<DialogState>({...});
```

### Frontend - Dialog Handling

#### Campus Dialog Form
```typescript
{dialogState.type === "campus" && (
  <>
    <div>
      <Label>College</Label>
      <select value={dialogState.collegeId || ""} disabled={mode === "edit"}>
        {colleges.map(c => <option key={c.id}>{c.name}</option>)}
      </select>
    </div>
    
    <div>
      <Label>Name</Label>
      <Input value={dialogState.name} />
    </div>
    
    <div>
      <Label>City *</Label>
      <Input value={dialogState.city} required />
    </div>
    
    <div>
      <Label>Address (Optional)</Label>
      <Input value={dialogState.address} />
    </div>
  </>
)}
```

#### Campus Submit Handler
```typescript
if (isCampus) {
  const collegeId = dialogState.collegeId || selectedCollege;
  
  if (mode === "edit") {
    await apiCall(`/colleges/${collegeId}/campuses/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: dialogState.name.trim(),
        city: dialogState.city.trim(),
        address: dialogState.address?.trim() || "",
      }),
    });
  } else {
    await apiCall(`/colleges/${collegeId}/campuses`, {
      method: "POST",
      body: JSON.stringify({
        name: dialogState.name.trim(),
        city: dialogState.city.trim(),
        address: dialogState.address?.trim() || "",
      }),
    });
  }
}
```

### Frontend - UI Components

#### Expandable College Card
```tsx
<button onClick={() => toggleCollege(college.id)} className="...">
  <div>
    <div className="font-semibold">{college.name}</div>
    <div className="text-xs text-gray-500">
      {(college.campuses || []).length} campus{...}
    </div>
  </div>
  <div className="flex gap-2">
    <Edit button onClick={handleEdit} />
    <Delete button onClick={handleDelete} />
    {expandedColleges.has(college.id) ? <ChevronUp /> : <ChevronDown />}
  </div>
</button>
```

#### Campus List (Inside Expanded College)
```tsx
{expandedColleges.has(college.id) && (
  <div className="border-t bg-gray-50 p-4">
    <div className="flex justify-between">
      <h4>Campuses</h4>
      <Button onClick={addCampus}>Add Campus</Button>
    </div>
    
    {college.campuses?.map(campus => (
      <div key={campus.id} className="bg-white border rounded p-3">
        <div>{campus.name}</div>
        <div className="text-xs text-gray-600">
          <MapPin /> {campus.city}
        </div>
        {campus.address && <div className="text-xs">{campus.address}</div>}
        <div className="flex gap-1">
          <Edit onClick={editCampus} />
          <Delete onClick={deleteCampus} />
        </div>
      </div>
    ))}
  </div>
)}
```

## Data Flow Examples

### Adding a Campus
```
User clicks "Add Campus"
  ↓
setDialogState({ type: "campus", collegeId: "..." })
  ↓
Dialog opens with campus form fields
  ↓
User fills: name="Main", city="Bangalore", address="123 St"
  ↓
handleSubmit()
  ↓
POST /api/colleges/:collegeId/campuses
  ↓
Backend: College.findByIdAndUpdate(..., { $push: { campuses: {...} } })
  ↓
Database updated
  ↓
fetchData() reloads colleges
  ↓
setColleges([...]) updates state
  ↓
Component re-renders with new campus
```

### Editing a Campus
```
User clicks edit on campus
  ↓
setDialogState({ type: "campus", item: campus, ...campus data })
  ↓
Dialog opens with pre-filled fields
  ↓
User modifies city from "Bangalore" to "Hyderabad"
  ↓
handleSubmit()
  ↓
PUT /api/colleges/:collegeId/campuses/:campusId
  ↓
Backend: College.findByIdAndUpdate(..., { $set: { 'campuses.$[elem]...': value } })
  ↓
Database updated
  ↓
fetchData() reloads
  ↓
UI shows updated campus
```

## Performance Considerations

1. **Embedding vs Separate Collection**
   - Chose embedding because:
     - Colleges won't have too many campuses (usually < 50)
     - Campuses are always accessed with their college
     - Reduces complexity and joins

2. **Expandable UI**
   - Only expanded colleges load campuses data
   - State tracking with Set<string> for O(1) lookups

3. **Form Validation**
   - Client-side: Prevents empty submissions
   - Server-side: Double checks required fields

4. **Error Handling**
   - Toast notifications for user feedback
   - Try-catch blocks with user-friendly messages

## Testing Scenarios

### Happy Path
1. Create college "AIBT" ✓
2. Add campus "Main" in "Bangalore" ✓
3. Add campus "North" in "Delhi" ✓
4. Edit "Main" campus address ✓
5. Delete "North" campus ✓
6. View final state: AIBT with 1 campus ✓

### Edge Cases
1. Empty name field - Form disabled, can't submit
2. Missing city field - Form disabled, can't submit
3. Address field optional - Submit works without it
4. Duplicate names - Allowed (backend doesn't restrict)
5. Special characters in name - Works fine
6. Very long address - Works (no length limit set)

### Error Scenarios
1. Network failure - Toast error message
2. Unauthorized (no auth token) - 401 response
3. College not found - Update fails gracefully
4. Campus not found - Delete fails gracefully
5. Concurrent edits - Last write wins

## Future Enhancement Opportunities

1. **Batch Campus Assignment**
   - Link batches to specific campuses
   - Create campus-batch hierarchy

2. **Campus Metadata**
   - Phone, email, principal name
   - Campus strength/capacity
   - Photo gallery

3. **Advanced Filtering**
   - Filter students by campus
   - Campus-wise analytics
   - Multi-campus reports

4. **Validation**
   - Prevent duplicate city for same college
   - Campus email validation
   - Phone number formatting

5. **Bulk Operations**
   - Import campuses from CSV
   - Export campus list
   - Bulk update

6. **Audit Trail**
   - Track who added/edited campus
   - Change history
   - Rollback capability
