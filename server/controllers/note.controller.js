const Note = require('../models/note.model');

// create note
module.exports.createNote = (req, res) => {
    Note.create(req.body)
    .then(note => res.json(note))
    .catch(err => {
        if (err.code === 11000) {
            res.status(400).json({ message: "Title must be unique" });
        } else if (err.name === 'ValidationError') {
            return res.status(400).json(err);
        } else {
            return res.status(500).json(err);
        }
    });
}
// find all notes
module.exports.getAllNotes = (req, res) => {
    Note.find({})
        .then(notes => {
            console.log(notes);
            res.json(notes)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
}

// find random note using $sample operator provided by mongodb
module.exports.getRandomNote = (req, res) => {
    Note.aggregate([{ $sample: { size: 1 } }])
        .then(note => res.json(note))
        .catch(err => res.json(err));
}

// dort by oldest using timestamp 
module.exports.getOldestNote = (req, res) => {
    Note.find({}).sort({createdAt: 1})
        .then(note => res.json(note))
        .catch(err => res.json(err));
}

// sort by newest using timestamp
module.exports.getNewestNote = (req, res) => {
    Note.find({}).sort({createdAt: -1})
        .then(note => res.json(note))
        .catch(err => res.json(err));
}

// get one note by id and its details
module.exports.getNoteById = (req, res) => {
    Note.findOne({_id: req.params.id})
    .then(note => res.json(note))
    .catch(err => res.json(err));
}

//update an existing note
module.exports.updateNote = (req, res) => {
    Note.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(updatedNote => res.json(updatedNote))
    .catch(err => res.json(err))
}

// delete a Note
module.exports.deleteNote = (req, res) => {
    Note.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err))
}
