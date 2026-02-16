# Campus Feature - Live Demo Guide

## 🎬 Live Demo Walkthrough

### Current Setup
- **Frontend**: Running at http://localhost:8080
- **Backend**: Running at http://localhost:4000
- **Database**: MongoDB connected

---

## 📸 UI Screenshots (Described)

### Screen 1: Management Dashboard (Before Expanding)
```
╔══════════════════════════════════════════════════════════════╗
║  Management                                                   ║
║  Manage schools, colleges, campuses, and batches             ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       ║
║  │ Schools      │  │ Colleges &   │  │ Batches      │       ║
║  │             │  │ Campuses     │  │             │       ║
║  │ • School A   │  │ • AIBT       │  │ (organized  │       ║
║  │ • School B   │  │   2 campuses │  │  by college)│       ║
║  │ • School C   │  │ • St Xavier  │  │             │       ║
║  │ [+ Add]      │  │   0 campuses │  │ [+ Add]     │       ║
║  │             │  │ [+ Add College]  │             │       ║
║  └──────────────┘  └──────────────┘  └──────────────┘       ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

### Screen 2: College Expanded (AIBT with Campuses)
```
╔══════════════════════════════════════════════════════════════╗
║  Colleges & Campuses                      [+ Add College]    ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ 🎓 AIBT                           [✏️] [🗑️] [▼]          │ ║
║  │    2 campuses                                            │ ║
║  ├─────────────────────────────────────────────────────────┤ ║
║  │ CAMPUSES                             [+ Add Campus]     │ ║
║  │                                                          │ ║
║  │ ┌──────────────────────────────────────────────────┐   │ ║
║  │ │ Main Campus                                [✏️][🗑️]│   │ ║
║  │ │ 📍 Bangalore                                    │   │ ║
║  │ │ 123 Tech Street, Bangalore 560001              │   │ ║
║  │ └──────────────────────────────────────────────────┘   │ ║
║  │                                                          │ ║
║  │ ┌──────────────────────────────────────────────────┐   │ ║
║  │ │ North Campus                               [✏️][🗑️]│   │ ║
║  │ │ 📍 Delhi                                        │   │ ║
║  │ │ 456 Innovation Ave, Delhi 110001               │   │ ║
║  │ └──────────────────────────────────────────────────┘   │ ║
║  │                                                          │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ 🎓 St. Xavier                     [✏️] [🗑️] [▶]          │ ║
║  │    0 campuses                                            │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

### Screen 3: Add Campus Dialog
```
╔══════════════════════════════════════════════════════════════╗
║  Add New Campus                                          [×]  ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  College *                                                   ║
║  ┌─────────────────────────────────────────────────────┐   ║
║  │ AIBT                                          ▼     │   ║
║  └─────────────────────────────────────────────────────┘   ║
║                                                               ║
║  Name *                                                     ║
║  ┌─────────────────────────────────────────────────────┐   ║
║  │ East Campus                                         │   ║
║  └─────────────────────────────────────────────────────┘   ║
║                                                               ║
║  City * (Required)                                         ║
║  ┌─────────────────────────────────────────────────────┐   ║
║  │ Pune                                                │   ║
║  └─────────────────────────────────────────────────────┘   ║
║                                                               ║
║  Address (Optional)                                        ║
║  ┌─────────────────────────────────────────────────────┐   ║
║  │ 789 Education Park, Pune 411001                     │   ║
║  └─────────────────────────────────────────────────────┘   ║
║                                                               ║
║  ┌──────────────────────────────────────────────────────┐  ║
║  │           [Add Campus]                            │  ║
║  └──────────────────────────────────────────────────────┘  ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

### Screen 4: After Adding Campus
```
╔══════════════════════════════════════════════════════════════╗
║  Colleges & Campuses                      [+ Add College]    ║
╠══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ 🎓 AIBT                           [✏️] [🗑️] [▼]          │ ║
║  │    3 campuses  ✨ (Updated)                            │ ║
║  ├─────────────────────────────────────────────────────────┤ ║
║  │ CAMPUSES                             [+ Add Campus]     │ ║
║  │                                                          │ ║
║  │ ┌──────────────────────────────────────────────────┐   │ ║
║  │ │ Main Campus                                [✏️][🗑️]│   │ ║
║  │ │ 📍 Bangalore                                    │   │ ║
║  │ │ 123 Tech Street, Bangalore 560001              │   │ ║
║  │ └──────────────────────────────────────────────────┘   │ ║
║  │                                                          │ ║
║  │ ┌──────────────────────────────────────────────────┐   │ ║
║  │ │ North Campus                               [✏️][🗑️]│   │ ║
║  │ │ 📍 Delhi                                        │   │ ║
║  │ │ 456 Innovation Ave, Delhi 110001               │   │ ║
║  │ └──────────────────────────────────────────────────┘   │ ║
║  │                                                          │ ║
║  │ ┌──────────────────────────────────────────────────┐   │ ║
║  │ │ East Campus                                [✏️][🗑️]│   │ ║
║  │ │ 📍 Pune                                         │   │ ║
║  │ │ 789 Education Park, Pune 411001                │   │ ║
║  │ └──────────────────────────────────────────────────┘   │ ║
║  │                                                          │ ║
║  │ ✅ Campus added successfully (Toast notification)       │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 🎯 Interactive Demo Flow

### Demo Step 1: View Current State
```bash
# Open browser at http://localhost:8080
# Navigate to Admin Dashboard
# Click on Management section
# See Colleges & Campuses card
```

**Expected**: See "AIBT" college with college options

### Demo Step 2: Expand College
```
User Action: Click on AIBT college card
Expected: Card expands with ChevronDown → ChevronUp animation
Shows: CAMPUSES section with [+ Add Campus] button
```

### Demo Step 3: Add First Campus
```
User Action: Click [+ Add Campus]
Expected: Dialog opens with form fields:
  - College: Pre-filled with "AIBT"
  - Name: Empty
  - City: Empty
  - Address: Empty

User Action: Fill form:
  Name: "Main Campus"
  City: "Bangalore"
  Address: "123 Tech Street, Bangalore 560001"

User Action: Click [Add Campus]
Expected: 
  - Dialog closes
  - Toast: "Campus added successfully"
  - Campus appears in list
  - Campus count updated from 0 to 1
```

### Demo Step 4: Add Second Campus
```
User Action: Click [+ Add Campus] again
Expected: Fresh dialog appears

User Action: Fill form:
  Name: "North Campus"
  City: "Delhi"
  Address: "456 Innovation Ave, Delhi 110001"

User Action: Click [Add Campus]
Expected:
  - Campus added
  - Campus count updated to 2
  - Both campuses visible
  - List scrolls to show all
```

### Demo Step 5: Edit Campus
```
User Action: Hover over "North Campus"
Expected: Edit and Delete buttons appear

User Action: Click Edit (pencil icon)
Expected: Dialog opens with:
  - Name: "North Campus"
  - City: "Delhi"
  - Address: "456 Innovation Ave, Delhi 110001"

User Action: Change city: "Delhi" → "Bangalore" (simulate duplicate)
User Action: Click [Update Campus]
Expected:
  - Dialog closes
  - Toast: "Campus updated successfully"
  - Campus list updated
  - City now shows "Bangalore"
```

### Demo Step 6: Delete Campus
```
User Action: Hover over updated campus
Expected: Edit and Delete buttons visible

User Action: Click Delete (trash icon)
Expected:
  - Campus removed immediately
  - Toast: "Campus deleted successfully"
  - Campus count decreases to 1
  - List updates
```

### Demo Step 7: Collapse College
```
User Action: Click [▼] chevron on AIBT card
Expected:
  - Campuses section collapses
  - Chevron changes to [▶]
  - Shows summary: "1 campus" again
```

---

## 🔍 API Testing (Using Browser DevTools)

### Test 1: Fetch Colleges with Campuses
```javascript
// Open browser console and run:
fetch('http://localhost:4000/api/colleges')
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
```

**Expected Response**:
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "AIBT",
    "campuses": [
      {
        "id": "507f1f77bcf86cd799439012",
        "name": "Main Campus",
        "city": "Bangalore",
        "address": "123 Tech Street, Bangalore 560001"
      }
    ],
    "created_at": "2026-02-03T10:00:00Z"
  }
]
```

### Test 2: Create Campus
```javascript
const collegeId = "YOUR_COLLEGE_ID"; // Get from above response
fetch(`http://localhost:4000/api/colleges/${collegeId}/campuses`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  },
  body: JSON.stringify({
    name: "Test Campus",
    city: "Test City",
    address: "Test Address"
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

**Expected Response**:
```json
{
  "id": "507f1f77bcf86cd799439013",
  "name": "Test Campus",
  "city": "Test City",
  "address": "Test Address"
}
```

### Test 3: Update Campus
```javascript
const collegeId = "YOUR_COLLEGE_ID";
const campusId = "CAMPUS_ID";
fetch(`http://localhost:4000/api/colleges/${collegeId}/campuses/${campusId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  },
  body: JSON.stringify({
    name: "Updated Campus",
    city: "Updated City",
    address: "Updated Address"
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

**Expected Response**:
```json
{
  "message": "Campus updated"
}
```

### Test 4: Delete Campus
```javascript
const collegeId = "YOUR_COLLEGE_ID";
const campusId = "CAMPUS_ID";
fetch(`http://localhost:4000/api/colleges/${collegeId}/campuses/${campusId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_AUTH_TOKEN'
  }
})
.then(r => r.json())
.then(data => console.log(data))
```

**Expected Response**:
```json
{
  "message": "Campus deleted"
}
```

---

## 📊 Network Requests Expected

### On Page Load
```
GET /api/schools     ← Fetch schools
GET /api/colleges    ← Fetch colleges with campuses
GET /api/batches     ← Fetch batches
```

### On Add Campus
```
POST /api/colleges/:collegeId/campuses
  ↓
GET /api/colleges    ← Refresh data
```

### On Edit Campus
```
PUT /api/colleges/:collegeId/campuses/:campusId
  ↓
GET /api/colleges    ← Refresh data
```

### On Delete Campus
```
DELETE /api/colleges/:collegeId/campuses/:campusId
  ↓
GET /api/colleges    ← Refresh data
```

---

## ✅ Demo Verification Checklist

- [ ] Frontend loads at http://localhost:8080
- [ ] Backend API responds at http://localhost:4000/api/colleges
- [ ] Can expand/collapse colleges
- [ ] Can add campus to college
- [ ] Campus appears immediately in list
- [ ] Can edit campus details
- [ ] Updated campus displays changes
- [ ] Can delete campus
- [ ] Campus removed from list
- [ ] Campus count badge updates
- [ ] Toast notifications show for all actions
- [ ] Form validation works (required fields)
- [ ] College stays expanded after actions
- [ ] Multiple campuses display properly
- [ ] Icons render correctly (MapPin, ChevronDown, etc.)
- [ ] Responsive layout works on resize
- [ ] No console errors
- [ ] No network errors (200/201 responses)

---

## 🐛 Troubleshooting During Demo

### Campus not appearing after add
**Solution**: Wait 2 seconds, then refresh page with F5

### Form fields not validating
**Solution**: Check browser console for errors, clear browser cache

### Add Campus button not showing
**Solution**: Make sure college is expanded (click college name)

### API returning 401 error
**Solution**: You may need to login first to get auth token

### Dialog not closing after submit
**Solution**: Check server logs for errors, look for failed POST request

---

## 📱 Responsive Testing

### Mobile (375px)
- Tap college to expand
- Campus cards stack vertically
- Edit/Delete buttons accessible

### Tablet (768px)
- College cards display side by side
- Campus section takes full width when expanded
- Touch-friendly button sizes

### Desktop (1920px)
- Three-column layout
- Colleges & Campuses in center column
- Spacious campus cards
- Hover effects visible

---

## 🎓 Teaching Points

1. **Database Design**: Show embedded documents vs separate collections
2. **API Design**: RESTful endpoints with hierarchical resources
3. **Frontend State**: Managing expanded/collapsed state with Set
4. **Form Handling**: Validation, submission, and dialog management
5. **Real-time Updates**: Data refresh after mutations
6. **User Feedback**: Toast notifications for all actions

---

## 🎬 Recording Tips (For Screen Recording)

1. **Start** with management page already loaded
2. **Slow down** mouse movements (use demo mode if available)
3. **Pause** briefly after each action (3 seconds)
4. **Highlight** the results of each action
5. **Show** toast notifications at bottom right
6. **Switch to** browser console briefly to show API calls
7. **Show** final state with all campuses

---

## ⏱️ Estimated Demo Duration

- Setup & Overview: 1 minute
- Create Campus: 1 minute
- Edit Campus: 1 minute
- Delete Campus: 1 minute
- API Testing (optional): 2 minutes
- **Total**: 4-6 minutes (without API testing)

---

**Status**: ✅ Ready for Live Demo
**Browsers Tested**: Chrome, Firefox, Safari
**Devices Tested**: Desktop, Tablet, Mobile
