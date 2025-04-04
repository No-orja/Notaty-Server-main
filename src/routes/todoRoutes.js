const express = require('express');
const {createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo} = require('../services/todoService');

const router = express.Router();


router.post('/', async (req, res)=>{
    const {task, isCompleted} = req.body;
    const todo = await createTodo(task, isCompleted);
    res.status(201).json(todo);
})

router.get('/', async(req, res)=>{
    const todos = await getAllTodos();
    res.status(200).json(todos);
})

router.get('/:id', async(req, res)=>{
    const todos = await getTodoById(req.params.id);
    res.status(200).json(todos);
})

router.put('/:id', async(req, res)=>{
    const {task, isCompleted} = req.body;
    const todo = await updateTodo(req.params.id, task, isCompleted);
    res.status(200).json(todo);
})

router.delete('/:id', async(req, res)=>{
    const todo = await deleteTodo(req.params.id);
    res.status(200).json(todo);
})

module.exports = router;