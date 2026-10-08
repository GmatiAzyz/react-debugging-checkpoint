import { useState } from 'react';

export default function Header({ appName, user, theme, onToggleTheme, totalCount, completedCount }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="logo-badge">⚡</span>
        <div>
          <h1 className="app-title">{appName}</h1>
          <p className="app-subtitle">React DevTools Inspection & State Management</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="status-pill">
          <span className="dot active"></span>
          <span>{completedCount} / {totalCount} Done</span>
        </div>

        <button 
          type="button" 
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        <div className="profile-wrapper">
          <button 
            type="button"
            className="profile-btn"
            onClick={() => setIsProfileMenuOpen(prev => !prev)}
          >
            <span className="avatar-circle">{user.avatar}</span>
            <span className="profile-name">{user.name}</span>
          </button>

          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <strong>{user.name}</strong>
                <span className="profile-role">{user.role}</span>
              </div>
              <hr />
              <div className="dropdown-meta">
                <span>DevTools Status:</span>
                <span className="badge">State Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
