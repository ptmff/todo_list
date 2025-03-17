import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import apiMiddleware from './apiMiddleware';

// Функции для загрузки/сохранения состояния в Local Storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (!serializedState) return undefined;
    return { todos: { items: JSON.parse(serializedState) } };
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.todos.items);
    localStorage.setItem('todos', serializedState);
  } catch (err) {
    // игнорируем ошибки записи
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
  preloadedState,
});

// Сохранение состояния при каждом изменении
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
