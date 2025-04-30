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

const updateTodo = async (id, task)=>{
    return await Todo.findByIdAndUpdate(id, {task}, {new: true});
}

const toggleTodoCompleted = async (id)=>{
    const todo = await Todo.findById(id);
    if (!todo) throw new Error('Todo not found'); 

    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    return todo;
}

module.exports = {createTodo, getAllTodos, getTodoById, deleteTodo, updateTodo, toggleTodoCompleted};