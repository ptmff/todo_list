import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onDelete, onUpdate, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    onUpdate(todo.id, text);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {/* Кружок для отметки выполненной задачи с динамическим классом */}
      <div 
        className={`todo-check ${todo.completed ? 'completed' : ''}`} 
        onClick={() => onComplete(todo.id, todo.completed)}
      >
        {todo.completed && <span className="checkmark">&#10003;</span>}
      </div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="todo-edit-input"
        />
      ) : (
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
      )}
      <div className="todo-actions">
        {isEditing ? (
          <button className="btn btn-save" onClick={handleSave}>Save</button>
        ) : (
          <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
