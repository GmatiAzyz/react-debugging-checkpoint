import { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, filter, searchQuery, onToggle, onDelete, onPriorityChange }) {
  const [sortBy, setSortBy] = useState('date');

  // Filter tasks based on current filter & search query
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return !task.completed && matchesSearch;
    if (filter === 'completed') return task.completed && matchesSearch;
    return task.category.toLowerCase() === filter.toLowerCase() && matchesSearch;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const pOrder = { High: 3, Medium: 2, Low: 1 };
      return pOrder[b.priority] - pOrder[a.priority];
    }
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return b.id - a.id; // date (newest first)
  });

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <span className="task-count-label">
          Showing <strong>{sortedTasks.length}</strong> of <strong>{tasks.length}</strong> tasks
        </span>

        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="date">Newest First</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks match your filter criteria.</p>
        </div>
      ) : (
        <div className="task-cards-grid">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onPriorityChange={onPriorityChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
