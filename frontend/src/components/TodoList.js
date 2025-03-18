import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../store/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { items, status, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd(e);
    }
  };

  const handleDelete = (id) => dispatch(deleteTodo(id));
  const handleUpdate = (id, text) => dispatch(updateTodo({ id, text }));
  const handleComplete = (id, currentStatus) => {
    dispatch(updateTodo({ id, completed: !currentStatus }));
  };

  const pendingTasks = items.filter(task => !task.completed);
  const completedTasks = items.filter(task => task.completed);

  return (
    <div>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="✨ Add a new task..."
          style={{ margin: 0 }}
        />
        <button type="submit" className="btn btn-edit" style={{ padding: '16px 24px' }}>
          Add Task
        </button>
      </form>
      
      {status === 'loading' && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-color)' }}>
          Loading tasks...
        </div>
      )}
      
      {status === 'failed' && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#ef4444',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          Error: {error}
        </div>
      )}

      {pendingTasks.length > 0 && (
        <>
          <h2>Pending Tasks ({pendingTasks.length})</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pendingTasks.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onComplete={handleComplete}
              />
            ))}
          </ul>
        </>
      )}

      {completedTasks.length > 0 && (
        <>
          <h2>Completed Tasks ({completedTasks.length})</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {completedTasks.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onComplete={handleComplete}
              />
            ))}
          </ul>
        </>
      )}

      {items.length === 0 && status !== 'loading' && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: 'var(--completed-text)',
          fontSize: '1.1rem'
        }}>
          No tasks yet. Add your first task above! ✨
        </div>
      )}
    </div>
  );
};

export default TodoList;