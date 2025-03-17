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

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
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
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add a new todo"
        />
        <button onClick={handleAdd} className="btn btn-edit">Add Todo</button>
      </div>
      {status === 'loading' && <div>Loading tasks...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      <h2>Pending Tasks</h2>
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
      <h2>Completed Tasks</h2>
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
    </div>
  );
};

export default TodoList;
