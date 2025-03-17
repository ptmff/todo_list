import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import { fetchTodos } from './store/todoSlice';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  const refreshTodos = () => {
    dispatch(fetchTodos());
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Todo App</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={refreshTodos} className="btn-refresh" title="Refresh">
            &#x21bb;
          </button>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;
