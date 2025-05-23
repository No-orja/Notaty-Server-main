// 📁 File: api/todos.js
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoCompleted
} = require("../src/services/todoService");
require('../src/db/connection');

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = async (req, res) => {
  const method = req.method;
  const url = new URL(req.url, 'http://localhost');
  const pathParts = url.pathname.split('/').filter(Boolean); // ["api", "todos", "id"]

  if (pathParts[0] !== 'api' || pathParts[1] !== 'todos') {
    return res.status(404).json({ message: 'Not found' });
  }

  const id = pathParts[2];
  const subAction = pathParts[3];

  try {
    if (method === 'GET' && !id) {
      const todos = await getAllTodos();
      return res.status(200).json(todos);
    }

    if (method === 'GET' && id) {
      const todo = await getTodoById(id);
      return res.status(200).json(todo);
    }

    if (method === 'POST') {
      const { task, isCompleted } = await parseBody(req);
      const todo = await createTodo(task, isCompleted);
      return res.status(201).json(todo);
    }

    if (method === 'PUT' && id) {
      const { task } = await parseBody(req);
      const todo = await updateTodo(id, task);
      return res.status(200).json(todo);
    }

    if (method === 'DELETE' && id) {
      const todo = await deleteTodo(id);
      return res.status(200).json(todo);
    }

    if (method === 'PATCH' && id && subAction === 'toggle-complete') {
      const updatedTodo = await toggleTodoCompleted(id);
      return res.status(200).json(updatedTodo);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
