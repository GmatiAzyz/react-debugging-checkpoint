import { useState } from 'react';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const initialTasks = [
  {
    id: 1,
    title: 'Inspect state & props in React DevTools',
    completed: false,
    category: 'Learning',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Verify component render updates & key warnings',
    completed: true,
    category: 'Work',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Test prop callback handlers in TaskCard',
    completed: false,
    category: 'Personal',
    priority: 'Low',
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [user] = useState({
    name: 'Alex Johnson',
    role: 'Frontend Engineer',
    avatar: '👨‍💻',
  });

  // Handler to toggle task completion
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handler to add a new task
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      ...newTaskData,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handler to delete a task
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Handler to update task priority
  const handlePriorityChange = (id, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  // Toggle dark/light theme class on app container
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className={`app-root ${theme}`}>
      <Header
        appName="DevTools Debugging Dashboard"
        user={user}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        totalCount={tasks.length}
        completedCount={completedCount}
      />

      <main className="app-container">
        <section className="top-section">
          <TaskStats tasks={tasks} activeFilter={filter} />
          <TaskInput onAddTask={handleAddTask} />
        </section>

        <section className="filter-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            {['all', 'pending', 'completed', 'work', 'personal', 'learning'].map((f) => (
              <button
                key={f}
                type="button"
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <TaskList
          tasks={tasks}
          filter={filter}
          searchQuery={searchQuery}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onPriorityChange={handlePriorityChange}
        />
      </main>
    </div>
  );
}

export default App;
