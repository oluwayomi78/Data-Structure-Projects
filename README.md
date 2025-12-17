# Data Structure Projects

This folder contains four web apps demonstrating JavaScript data structures in action.

---

## 1. Task Scheduler (Queue-Based)
**Logic:**  
- Implements a Queue (FIFO) to store tasks.  
- New tasks are added at the end.  
- Tasks are processed/removed from the front.  

**Features:**  
- Add tasks  
- View task queue  
- Process/remove tasks one by one  

---

## 2. Undo–Redo System (Stack-Based)
**Logic:**  
- Uses two stacks: `undoStack` and `redoStack`.  
- Undo pops the last action to redoStack.  
- Redo restores the last undone action.  

**Features:**  
- Add actions  
- Undo last action  
- Redo last undone action  

**Optional:** Save state to cloud database.

---

## 3. Unique Visitor Tracker (Set-Based)
**Logic:**  
- Uses a Set to store unique visitor IDs.  
- Duplicate entries are ignored automatically.  

**Features:**  
- Track unique visitors  
- Display total unique visitors and list of IDs  

---

## 4. Contacts App / Manager (Map-Based)
**Logic:**  
- Uses a Map to store key-value pairs: contact name → phone number.  
- Supports add, search, edit, delete.  

**Features:**  
- Add contacts  
- Search contacts by name or phone  
- Edit and delete contacts  

**Optional:** Save contacts to JSON or deploy REST API online.

---

### Notes
- Each project is self-contained in its folder.  
- Open `index.html` in a browser to run each project.  
- Optional persistence can be implemented for advanced use cases.
