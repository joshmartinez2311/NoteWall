const mongoose = require('mongoose');
const NoteWallSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true,"Title is required." ],
        unique: true,
        trim: true,
        minlength: [2, "title must contain at least 2 characters!"],
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, " note body cannot be empty"],
        maxlength: [255, "Note body cannot contain more than 255 characters"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteWallSchema);