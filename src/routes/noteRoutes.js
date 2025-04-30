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

// Create a new note
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await createNote(title, content);
        res.status(201).json(note);
    } catch (error) {
        console.error('POST /notes error:', error);
        res.status(500).json({ message: 'Failed to create note' });
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await getAllNotes();
        res.status(200).json(notes);
    } catch (error) {
        console.error('GET /notes error:', error);
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
});

// Get note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await getNoteById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        console.error(`GET /notes/${req.params.id} error:`, error);
        res.status(500).json({ message: 'Failed to fetch note' });
    }
});

// Update note
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await updateNote(req.params.id, title, content);
        res.status(200).json(note);
    } catch (error) {
        console.error(`PUT /notes/${req.params.id} error:`, error);
        res.status(500).json({ message: 'Failed to update note' });
    }
});

// Toggle completed status
router.patch('/:id/toggle-complete', async (req, res) => {
    try {
        const updatedNote = await completedStatus(req.params.id);
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(`PATCH /notes/${req.params.id}/completed error:`, error);
        res.status(500).json({ message: 'Failed to update completed status' });
    }
});

// Delete note
router.delete('/:id', async (req, res) => {
    try {
        const note = await deleteNote(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        console.error(`DELETE /notes/${req.params.id} error:`, error);
        res.status(500).json({ message: 'Failed to delete note' });
    }
});

module.exports = router;
