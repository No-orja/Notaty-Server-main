const Todo = require('../models/todoModel');

const createTodo = async (task, isCompleted)=>{
    const todo = new Todo({
        task, 
        isCompleted
    });
    await todo.save();
    return todo;
}

const getAllTodos = async ()=>{
    return await Todo.find({});
}

const getTodoById = async (id)=>{
    return await Todo.findById(id);
}

const deleteTodo = async (id)=>{
    return await Todo.findByIdAndDelete(id);
}

const updateTodo = async (id, task, isCompleted)=>{
    return await Todo.findByIdAndUpdate(id, {task, isCompleted}, {new: true});
}

module.exports = {createTodo, getAllTodos, getTodoById, deleteTodo, updateTodo};