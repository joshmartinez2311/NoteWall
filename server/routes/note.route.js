const NoteController = require('../controllers/note.controller');

module.exports = (app) => {
    app.post('/api/note', NoteController.createNote);
    app.get('/api/note', NoteController.getAllNotes);
    app.get('/api/note/random', NoteController.getRandomNote);
    app.get('/api/note/oldest', NoteController.getOldestNote);
    app.get('/api/note/newest', NoteController.getNewestNote);
    app.get('/api/note/:id', NoteController.getNoteById);
    app.patch('/api/note/:id', NoteController.updateNote);
    app.delete('/api/note/:id', NoteController.deleteNote);
}