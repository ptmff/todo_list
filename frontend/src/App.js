import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  // Поддержка темной/светлой темы
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Todo App</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;
