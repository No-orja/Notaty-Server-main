const express = require('express');
const {
    createNote,
    getAllNotes, 
    getNoteById, 
    updateNote, 
    deleteNote,
    completedStatus
} = require('../services/noteService');

const router = express.Router();

router.post('/', async (Req, res)=>{
    const {title, content} = Req.body;
    const note = await createNote(title, content);
    res.status(201).json(note);
})

router.get('/', async(req, res)=>{
    const notes = await getAllNotes();
    res.status(200).json(notes);
})

router.get('/:id', async(req, res)=>{
    const notes = await getNoteById(req.params.id);
    res.status(200).json(notes);
})

router.put('/:id', async(req, res)=>{
    const {title, content} = req.body;
    const note = await updateNote(req.params.id, title, content);
    res.status(200).json(note);
})


router.put('/:id', async (req, res) => {
    try {
        console.log("🔵 Request to toggle completed status for:", req.params.id);

        const updatedNote = await completedStatus(req.params.id);
        
        console.log("🟢 Updated Note:", updatedNote);
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("🔴 Error updating note:", error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async(req, res)=>{
    const note = await deleteNote(req.params.id);
    res.status(200).json(note);
})

module.exports = router;