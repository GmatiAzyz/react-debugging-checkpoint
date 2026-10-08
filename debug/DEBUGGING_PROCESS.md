# React Developer Tools Debugging & Checkpoint Submission Report

---

## 📌 1. Project Overview & Setup

### **Application Details**
- **Application Name**: DevTools Debugging Dashboard
- **Framework**: React 19 + Vite
- **Debugging Tool**: React Developer Tools (Chrome/Edge/Firefox Extension)
- **Dev Server URL**: `http://localhost:5173/`

### **Setup Instructions**
1. **Launch the Development Server**:
   ```bash
   npm run dev
   ```
2. **Install React Developer Tools Extension**:
   - Open browser extensions store (Chrome Web Store / Firefox Add-ons).
   - Install **React Developer Tools**.
3. **Open the Application**:
   - Navigate to `http://localhost:5173/`.
   - Open Developer Tools (`F12` or `Right-Click -> Inspect`).
   - Click on the **⚛️ Components** tab.

---

## 🏗️ 2. Component Hierarchy, State Management & Props Flow

### **Component Hierarchy Diagram**
```
App (Root Component)
 ├── Header (Props: appName, user, theme, totalCount, completedCount, onToggleTheme)
 ├── TaskStats (Props: tasks, activeFilter)
 ├── TaskInput (Props: onAddTask)
 └── TaskList (Props: tasks, filter, searchQuery, onToggle, onDelete, onPriorityChange)
      └── TaskCard (Props: task, onToggle, onDelete, onPriorityChange)
```

### **Component Breakdown Table**

| Component File | Role | State Managed | Props Received |
| :--- | :--- | :--- | :--- |
| [`App.jsx`](../src/App.jsx) | Root State Store & Layout | `tasks`, `filter`, `searchQuery`, `theme`, `user` | None |
| [`Header.jsx`](../src/components/Header.jsx) | Header Bar & Profile Menu | `isProfileMenuOpen` (boolean) | `appName`, `user`, `theme`, `totalCount`, `completedCount`, `onToggleTheme` |
| [`TaskStats.jsx`](../src/components/TaskStats.jsx) | Metrics & Summary | `isExpanded` (boolean) | `tasks`, `activeFilter` |
| [`TaskInput.jsx`](../src/components/TaskInput.jsx) | Form Input | `title`, `category`, `priority` | `onAddTask` |
| [`TaskList.jsx`](../src/components/TaskList.jsx) | Task Filtering & Sorting | `sortBy` ('date' \| 'priority' \| 'alphabetical') | `tasks`, `filter`, `searchQuery`, `onToggle`, `onDelete`, `onPriorityChange` |
| [`TaskCard.jsx`](../src/components/TaskCard.jsx) | Individual Task Card | `isEditing`, `editTitle` | `task` (object), `onToggle`, `onDelete`, `onPriorityChange` |

---

## 🔍 3. Step-by-Step React DevTools Inspection Process

### **Step 1: Inspecting Component Tree & State in `App`**
1. Select `<App>` in the React DevTools component tree.
2. In the right-hand panel, inspect **Hooks -> State**:
   - `State [0]` (Tasks Array): Array of task objects.
   - `State [1]` (Filter): Currently active filter string (e.g. `"all"`).
   - `State [2]` (Search Query): Search input filter string.
   - `State [3]` (Theme): `'dark'` or `'light'`.
3. **Live Testing**: Change the `theme` value directly in DevTools from `'dark'` to `'light'` and observe the background theme transition.

### **Step 2: Inspecting Props Passing in `Header` & `TaskStats`**
1. Expand `<App>` and click on `<Header>`.
2. Inspect `Props`: Verify that `totalCount` and `completedCount` match the task array length.
3. Click on `<TaskStats>`. Toggle the `isExpanded` state in DevTools to verify that the category breakdown opens seamlessly.

### **Step 3: Inspecting Child Props & Callbacks in `TaskCard`**
1. Expand `<TaskList>` to reveal individual `<TaskCard>` components.
2. Click on a `<TaskCard>` node.
3. Inspect `Props -> task`:
   - `id`: Unique identifier
   - `title`: String
   - `completed`: Boolean
   - `category`: Category string
   - `priority`: Priority badge level

---

## 🛠️ 4. Identified Issues & Solutions

### **Issue 1: Direct Object Mutation in `TaskCard.jsx`**
- **Symptom**: When inline editing a task title in `TaskCard`, modifying `task.title = editTitle` directly mutates the prop object instead of dispatching an immutable state update to `App`. React DevTools revealed the parent state did not trigger a clean immutable re-render.
- **Root Cause**: Direct property reassignment on props object (`task.title = ...`).
- **Solution**: Pass an immutable update callback `onUpdateTaskTitle(id, newTitle)` up to `App.jsx`.

```diff
// TaskCard.jsx - Before (Direct Mutation Bug)
- task.title = editTitle.trim();
- setIsEditing(false);

// TaskCard.jsx - Fixed (Immutable Callback)
+ onUpdateTaskTitle(task.id, editTitle.trim());
+ setIsEditing(false);
```

---

### **Issue 2: Key Warning & Render Tracking**
- **Symptom**: Re-rendering task list without unique keys causes React rendering inefficiencies.
- **Root Cause**: Missing or index-based `key` prop in `TaskList.jsx`.
- **Solution**: Ensure each `<TaskCard>` utilizes `key={task.id}`.

```jsx
// TaskList.jsx - Clean Key Assignment
{sortedTasks.map((task) => (
  <TaskCard
    key={task.id}
    task={task}
    onToggle={onToggle}
    onDelete={onDelete}
    onPriorityChange={onPriorityChange}
  />
))}
```

---

## 🖼️ 5. React Developer Tools Screenshots Gallery

> [!NOTE]
> Save your browser screenshots in the `debug/screenshots/` folder using the filenames listed below to render them directly in this report.

### **Screenshot 1: React DevTools Component Tree Overview**
![01 Component Tree Overview](./screenshots/01_component_tree.png)
*Figure 1: Full React DevTools component tree showing App, Header, TaskStats, TaskInput, TaskList, and TaskCard hierarchy.*

---

### **Screenshot 2: Inspecting Root `App` State**
![02 Inspecting App State](./screenshots/02_inspecting_app_state.png)
*Figure 2: Inspecting hooks and state values (tasks, filter, searchQuery, theme) inside the App component.*

---

### **Screenshot 3: Inspecting `TaskCard` Props & Local State**
![03 Inspecting TaskCard Props](./screenshots/03_inspecting_props.png)
*Figure 3: Inspecting passed props (task object, callbacks) and local state (isEditing, editTitle) for TaskCard.*

---

### **Screenshot 4: Identifying & Diagnosing Issues**
![04 Diagnosing Issues](./screenshots/04_identifying_issue.png)
*Figure 4: Diagnosing state value updates and handler callback execution in React DevTools.*

---

### **Screenshot 5: Verified Working Application**
![05 Verified Working Application](./screenshots/05_verified_fix.png)
*Figure 5: Verification of fixed state flow and smooth component rendering after debugging.*

---

## ✅ 6. Conclusion & Verification

- **Component Hierarchy**: Fully structured with clean parent-to-child props passing and local component state.
- **React Developer Tools**: Successfully verified component tree navigation, props/state inspection, live state manipulation, and re-render tracking.
- **Application Status**: Verified clean build (`npm run build`) and active development server running at `http://localhost:5173/`.
