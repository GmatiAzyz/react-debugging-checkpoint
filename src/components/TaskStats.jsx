import { useState } from 'react';

export default function TaskStats({ tasks, activeFilter }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const highPriorityCount = tasks.filter(t => t.priority === 'High' && !t.completed).length;

  return (
    <div className="stats-card">
      <div className="stats-header" onClick={() => setIsExpanded(prev => !prev)}>
        <div className="stats-title">
          <h3>Progress Metrics</h3>
          <span className="filter-badge">Filter: {activeFilter}</span>
        </div>
        <button type="button" className="expand-btn">
          {isExpanded ? 'Collapse ▲' : 'Expand Details ▼'}
        </button>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-val">{total}</span>
          <span className="stat-lbl">Total Tasks</span>
        </div>
        <div className="stat-box success">
          <span className="stat-val">{completed}</span>
          <span className="stat-lbl">Completed</span>
        </div>
        <div className="stat-box warning">
          <span className="stat-val">{pending}</span>
          <span className="stat-lbl">Pending</span>
        </div>
        <div className="stat-box danger">
          <span className="stat-val">{highPriorityCount}</span>
          <span className="stat-lbl">Urgent</span>
        </div>
      </div>

      {isExpanded && (
        <div className="stats-detail">
          <h4>Category Breakdown:</h4>
          <ul>
            <li>Work Tasks: {tasks.filter(t => t.category === 'Work').length}</li>
            <li>Personal Tasks: {tasks.filter(t => t.category === 'Personal').length}</li>
            <li>Learning Tasks: {tasks.filter(t => t.category === 'Learning').length}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
