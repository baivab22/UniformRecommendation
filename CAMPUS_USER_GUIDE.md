# Campus Management Feature - User Guide

## How to Use the Campuses Feature

### 1. **Access Admin Management**
- Navigate to the Admin Dashboard
- You'll see the Management section with three main areas:
  - Schools (left column)
  - Colleges & Campuses (center column) - **NEW**
  - Batches (right column)

### 2. **Creating a College**
1. Click the **"Add College"** button in the Colleges & Campuses section
2. Enter the college name (e.g., "AIBT")
3. Click **"Add College"** in the dialog
4. The college now appears in the list

### 3. **Adding Campuses to a College**
1. Click on a college card to **expand** it
2. You'll see a "Campuses" section inside showing all existing campuses
3. Click **"Add Campus"** button
4. Fill in the following fields:
   - **Name** (required) - e.g., "Main Campus", "North Campus"
   - **City** (required) - e.g., "Bangalore", "Delhi"
   - **Address** (optional) - e.g., "123 Tech Street, Bangalore"
5. Click **"Add Campus"**
6. The new campus appears immediately in the campuses list

### 4. **Editing a Campus**
1. Expand a college to view its campuses
2. Hover over a campus and click the **edit icon** (pencil)
3. Modify the campus details in the dialog
4. Click **"Update Campus"**

### 5. **Deleting a Campus**
1. Expand a college to view its campuses
2. Hover over a campus and click the **delete icon** (trash)
3. The campus is removed immediately

### 6. **Viewing Campus Details**
Each campus displays:
- **Campus Name** - The name of the campus
- **City** - Location icon followed by the city name
- **Address** - Complete address (if provided)

## UI Elements

### College Card
```
┌─────────────────────────────────┐
│ [GraduationCap] AIBT            │ [Edit] [Delete] [▼]
│ 2 campuses                       │
├─────────────────────────────────┤
│ CAMPUSES          [Add Campus]   │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ Main Campus                  │ │
│ │ 📍 Bangalore                 │ │
│ │ 123 Tech Street, Bangalore   │ │ [Edit] [Delete]
│ └──────────────────────────────┘ │
│                                  │
│ ┌──────────────────────────────┐ │
│ │ North Campus                 │ │
│ │ 📍 Delhi                     │ │
│ │ 456 Innovation Ave, Delhi    │ │ [Edit] [Delete]
│ └──────────────────────────────┘ │
└─────────────────────────────────┘
```

### Adding/Editing Campus Dialog
```
┌──────────────────────────────────┐
│ Add New Campus                   │ [×]
├──────────────────────────────────┤
│ College                          │
│ [Select College ▼]               │
│                                  │
│ Name                             │
│ [Enter campus name...]           │
│                                  │
│ City *                           │
│ [Enter city...]                  │
│                                  │
│ Address (Optional)               │
│ [Enter address...]               │
│                                  │
│ [Add Campus]                     │
└──────────────────────────────────┘
```

## API Endpoints

### Get All Colleges with Campuses
```
GET /api/colleges
Response: [
  {
    "id": "college-id",
    "name": "AIBT",
    "campuses": [
      {
        "id": "campus-id-1",
        "name": "Main Campus",
        "city": "Bangalore",
        "address": "123 Tech Street"
      }
    ],
    "created_at": "2026-02-03T..."
  }
]
```

### Add Campus
```
POST /api/colleges/:collegeId/campuses
Headers: Authorization: <token>
Body: {
  "name": "Main Campus",
  "city": "Bangalore",
  "address": "123 Tech Street, Bangalore"
}
```

### Update Campus
```
PUT /api/colleges/:collegeId/campuses/:campusId
Headers: Authorization: <token>
Body: {
  "name": "Updated Name",
  "city": "New City",
  "address": "New Address"
}
```

### Delete Campus
```
DELETE /api/colleges/:collegeId/campuses/:campusId
Headers: Authorization: <token>
```

## Features Highlight

✅ **Hierarchical Structure** - Colleges contain multiple campuses
✅ **Expandable UI** - Clean, organized interface with expand/collapse
✅ **Location Information** - Each campus has city and address
✅ **Full CRUD** - Create, Read, Update, Delete campus operations
✅ **Real-time Updates** - Changes reflect immediately in the UI
✅ **Form Validation** - Required fields are enforced
✅ **Beautiful Design** - Modern UI with gradients and smooth transitions
✅ **Responsive Layout** - Works on different screen sizes
✅ **Icon Indicators** - MapPin and ChevronDown/ChevronUp icons for better UX

## Example Workflow

1. Create a college: "AIBT"
2. Expand the AIBT college card
3. Add first campus: "Main Campus" in "Bangalore"
4. Add second campus: "North Campus" in "Delhi"
5. View all campuses nested under AIBT
6. Edit a campus city from "Bangalore" to "Hyderabad"
7. Delete old campus if needed
8. All changes persist in the database

## Validation Rules

| Field | Required | Rules |
|-------|----------|-------|
| College Name | Yes | Non-empty string |
| Campus Name | Yes | Non-empty string |
| City | Yes | Non-empty string |
| Address | No | Any string (if provided) |

## Keyboard Shortcuts (Optional Future Enhancement)

- `Tab` - Navigate between fields
- `Enter` - Submit form
- `Escape` - Close dialog
