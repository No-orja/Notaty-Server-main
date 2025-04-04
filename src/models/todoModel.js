const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    task: { 
        type: String, 
        required: true 
    },
    isCompleted: { 
        type: Boolean, 
        default: false
    },
    createdAt: {  
        type: Date,
        default: Date.now 
    }  
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;