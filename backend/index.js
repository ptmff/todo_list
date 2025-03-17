const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let tasks = [];
let taskIdCounter = 1;

// Получить список задач (разделяем на невыполненные и выполненные)
app.get('/tasks', (req, res) => {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  res.json({ pending: pendingTasks, completed: completedTasks });
});

// Создание новой задачи
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const newTask = { id: taskIdCounter++, text, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Обновление задачи (редактирование текста и изменение статуса)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const task = tasks.find(task => task.id == id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (text !== undefined) task.text = text;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// Удаление задачи
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deletedTask = tasks.splice(index, 1)[0];
  res.json(deletedTask);
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
