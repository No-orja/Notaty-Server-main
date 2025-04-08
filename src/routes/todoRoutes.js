const express = require('express');
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../services/todoService');

const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const todo = await createTodo(task, isCompleted);
    res.status(201).json(todo);
  } catch (error) {
    console.error('POST /todos error:', error);
    res.status(500).json({ message: 'Failed to create todo' });
  }
});

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    console.error('GET /todos error:', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// Get todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    console.error(`GET /todos/${req.params.id} error:`, error);
    res.status(500).json({ message: 'Failed to fetch todo' });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const todo = await updateTodo(req.params.id, task, isCompleted);
    res.status(200).json(todo);
  } catch (error) {
    console.error(`PUT /todos/${req.params.id} error:`, error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await deleteTodo(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    console.error(`DELETE /todos/${req.params.id} error:`, error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

module.exports = router;
