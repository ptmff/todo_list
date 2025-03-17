import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo, fetchTodos } from '../store/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  // Пример асинхронной загрузки данных
  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  const handleAdd = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo({ id: Date.now(), text: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  const handleDelete = (id) => dispatch(removeTodo(id));
  const handleUpdate = (id, text) => dispatch(updateTodo({ id, text }));

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add a new todo"
        />
        <button onClick={handleAdd}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
