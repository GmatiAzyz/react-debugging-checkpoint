import { useState } from 'react';

export default function TaskCard({ task, onToggle, onDelete, onPriorityChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    task.title = editTitle.trim(); // Demonstrates mutable update warning/state passing check in DevTools!
    setIsEditing(false);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-main">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            type="text"
            className="edit-task-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        ) : (
          <span className="task-title-text" onClick={() => setIsEditing(true)}>
            {task.title}
          </span>
        )}
      </div>

      <div className="task-card-meta">
        <span className="task-category-tag">{task.category}</span>
        
        <select
          className={`priority-badge ${getPriorityClass(task.priority)}`}
          value={task.priority}
          onChange={(e) => onPriorityChange(task.id, e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button 
          type="button" 
          className="delete-task-btn" 
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
