const Note = require('../models/noteModel');

const createNote = async (title, content) => {
    const note = new Note({
        title,
        content
    });
    await note.save();
    return note;
};

const getAllNotes = async () => {
    return await Note.find({});
}

const getNoteById = async (id) => {
    return await Note.findById(id);
}

const updateNote = async(id, title, content)=>{
    return await Note.findByIdAndUpdate(id, {title, content}, {new: true});
}

const completedStatus = async (id) => {
    const note = await Note.findById(id);
    if (!note) throw new Error("Note not found");

    note.completed = !note.completed;
    await note.save();
    return note;
};

const deleteNote = async (id)=>{
    return await Note.findByIdAndDelete(id);
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    completedStatus
}