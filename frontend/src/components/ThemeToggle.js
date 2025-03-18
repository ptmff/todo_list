import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggle;