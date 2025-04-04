const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;