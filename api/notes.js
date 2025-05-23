// 📁 File: api/notes.js
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  completedStatus
} = require('../src/services/noteService');
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
  const pathParts = url.pathname.split('/').filter(Boolean); // ["api", "notes", "id"]

  if (pathParts[0] !== 'api' || pathParts[1] !== 'notes') {
    return res.status(404).json({ message: 'Not found' });
  }

  const id = pathParts[2];
  const subAction = pathParts[3];

  try {
    if (method === 'GET' && !id) {
      const notes = await getAllNotes();
      return res.status(200).json(notes);
    }

    if (method === 'GET' && id) {
      const note = await getNoteById(id);
      return res.status(200).json(note);
    }

    if (method === 'POST') {
      const { title, content } = await parseBody(req);
      const note = await createNote(title, content);
      return res.status(201).json(note);
    }

    if (method === 'PUT' && id) {
      const { title, content } = await parseBody(req);
      const note = await updateNote(id, title, content);
      return res.status(200).json(note);
    }

    if (method === 'DELETE' && id) {
      const note = await deleteNote(id);
      return res.status(200).json(note);
    }

    if (method === 'PATCH' && id && subAction === 'toggle-complete') {
      const updatedNote = await completedStatus(id);
      return res.status(200).json(updatedNote);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
