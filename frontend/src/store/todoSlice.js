import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Асинхронное действие для загрузки задач с сервера
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = await response.json();
  // Объединяем невыполненные и выполненные задачи в один массив
  return [...data.pending, ...data.completed];
});

// Асинхронное действие для добавления задачи
export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return await response.json();
});

// Асинхронное действие для обновления задачи (в том числе для изменения статуса)
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, text, completed }) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, completed })
  });
  return await response.json();
});

// Асинхронное действие для удаления задачи
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузка задач
      .addCase(fetchTodos.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Добавление задачи
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Обновление задачи
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Удаление задачи
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload.id);
      });
  },
});

export default todoSlice.reducer;
